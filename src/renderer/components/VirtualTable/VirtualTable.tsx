/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/static-property-placement */
import * as React from 'react';
import clsx from 'clsx';
import { withStyles, WithStyles } from '@mui/styles';
import { Theme, createTheme } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import {
  AutoSizer,
  Column,
  Table,
  TableCellRenderer,
  TableHeaderProps,
} from 'react-virtualized';
import { IconButton } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import { Api } from '../../Api';

const styles = (theme: Theme) =>
  ({
    flexContainer: {
      display: 'flex',
      alignItems: 'center',
      boxSizing: 'border-box',
    },
    table: {
      // temporary right-to-left patch, waiting for
      // https://github.com/bvaughn/react-virtualized/issues/454
      '& .ReactVirtualized__Table__headerRow': {
        ...(theme.direction === 'rtl' && {
          paddingLeft: '0 !important',
        }),
        ...(theme.direction !== 'rtl' && {
          paddingRight: undefined,
        }),
      },
    },
    tableRow: {
      cursor: 'pointer',
    },
    tableRowHover: {
      '&:hover': {
        backgroundColor: theme.palette.grey[200],
      },
    },
    tableCell: {
      flex: 1,
    },
    noClick: {
      cursor: 'initial',
    },
  } as const);

interface ColumnProps {
  dataKey: string;
  label: string;
  numeric?: boolean;
  width: number;
  flexGrow?: number;
  type?: 'path' | 'file';
}

interface Row {
  index: number;
}

interface MuiVirtualizedTableProps extends WithStyles<typeof styles> {
  columns: readonly ColumnProps[];
  headerHeight?: number;
  onRowClick?: () => void;
  rowCount: number;
  rowGetter: (row: Row) => any;
  rowHeight?: number;
}

class MuiVirtualizedTable extends React.PureComponent<MuiVirtualizedTableProps> {
  static defaultProps = {
    headerHeight: 48,
    rowHeight: 48,
  };

  getRowClassName = ({ index }: Row) => {
    const { classes, onRowClick } = this.props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer: TableCellRenderer = ({ cellData, columnIndex }) => {
    const { columns, classes, onRowClick } = this.props;
    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        align={
          (columnIndex != null && columns[columnIndex].numeric) || false
            ? 'right'
            : 'left'
        }
      >
        {columns[columnIndex].type === 'path' && (
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            onClick={() => {
              ((window as any).api as Api).ipcRenderer.openFolder(cellData);
            }}
          >
            <LinkIcon />
          </IconButton>
        )}
        {columns[columnIndex].type !== 'path' && <>{cellData}</>}
      </TableCell>
    );
  };

  headerRenderer = ({
    label,
    columnIndex,
  }: TableHeaderProps & { columnIndex: number }) => {
    const { headerHeight, columns, classes } = this.props;

    return (
      <TableCell
        component="div"
        className={clsx(
          classes.tableCell,
          classes.flexContainer,
          classes.noClick
        )}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
      >
        <span>{label}</span>
      </TableCell>
    );
  };

  render() {
    const { classes, columns, rowHeight, headerHeight, ...tableProps } =
      this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            height={height}
            width={width}
            rowHeight={rowHeight!}
            gridStyle={{
              direction: 'inherit',
            }}
            headerHeight={headerHeight!}
            className={classes.table}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({ dataKey, ...other }, index) => {
              return (
                <Column
                  key={dataKey}
                  headerRenderer={(headerProps) =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                  }
                  className={classes.flexContainer}
                  cellRenderer={this.cellRenderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

const defaultTheme = createTheme();
const VirtualizedTable = withStyles(styles, { defaultTheme })(
  MuiVirtualizedTable
);

export function ReactVirtualizedTable<T>({
  rows,
  columns,
}: {
  rows: T[];
  columns: ColumnProps[];
}) {
  return (
    <Paper style={{ height: '100%', width: '100%' }}>
      <VirtualizedTable
        rowCount={rows.length}
        rowGetter={({ index }) => rows[index]}
        columns={columns}
      />
    </Paper>
  );
}
