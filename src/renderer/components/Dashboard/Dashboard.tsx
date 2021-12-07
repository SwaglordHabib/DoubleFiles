import { Button, Typography } from '@mui/material';
import { useContext } from 'react';
import { LoaderWithCircularProgess } from '../Loader/LoaderWithCircularProgess';
import { FileContext } from '../providers/files';
import BasicTabs from '../Tabs/BasicTabs';
import { ReactVirtualizedTable } from '../VirtualTable/VirtualTable';
import { DashboardProps } from './Dashboard.type';

export function Dashboard({
  tab,
  handleOpenFolder,
  handleScan,
}: DashboardProps): JSX.Element {
  const { all, nonUniqe } = useContext(FileContext);

  return (
    <div
      style={{
        display: tab === 'File search' ? 'flex' : 'none',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Typography variant="h5" component="div">
        {tab}
      </Typography>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Button
          variant="contained"
          style={{
            margin: '1rem',
          }}
          onClick={handleOpenFolder}
        >
          Ordner auswählen
        </Button>
        <Button
          variant="contained"
          style={{
            margin: '1rem',
          }}
          onClick={handleScan}
        >
          Start scan
        </Button>
      </div>
      <BasicTabs>
        <LoaderWithCircularProgess lodable={nonUniqe}>
          {(nonUniqeFiles) => (
            <ReactVirtualizedTable
              rows={nonUniqeFiles}
              columns={[
                {
                  width: 120,
                  label: 'Filename',
                  dataKey: 'name',
                  flexGrow: 1,
                },
                {
                  width: 220,
                  label: 'Last modified',
                  dataKey: 'lastModified',
                },
                {
                  width: 100,
                  label: 'Path',
                  dataKey: 'path',
                  flexGrow: 1,
                  type: 'path',
                },
              ]}
            />
          )}
        </LoaderWithCircularProgess>
        <LoaderWithCircularProgess lodable={all}>
          {(allFiles) => (
            <ReactVirtualizedTable
              rows={allFiles}
              columns={[
                {
                  width: 120,
                  label: 'Filename',
                  dataKey: 'name',
                  flexGrow: 1,
                },
                {
                  width: 220,
                  label: 'Last modified',
                  dataKey: 'lastModified',
                },
                {
                  width: 100,
                  label: 'Path',
                  dataKey: 'path',
                  flexGrow: 1,
                  type: 'path',
                },
              ]}
            />
          )}
        </LoaderWithCircularProgess>
      </BasicTabs>
    </div>
  );
}
