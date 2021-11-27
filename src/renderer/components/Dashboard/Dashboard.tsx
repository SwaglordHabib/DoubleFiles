import { Button, CircularProgress, Paper, Typography } from '@mui/material';
import { ReactVirtualizedTable } from '../VirtualTable/VirtualTable';
import { DashboardProps } from './Dashboard.type';

export function Dashboard({
  tab,
  files,
  handleOpenFolder,
  handleScan,
  loading,
}: DashboardProps): JSX.Element {
  return (
    <div
      style={{
        display: tab === 'File search' ? 'flex' : 'none',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Typography
        variant="h5"
        component="div"
        sx={{
          flexGrow: 1,
        }}
      >
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
      {loading ? (
        <Paper
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress />
        </Paper>
      ) : (
        <ReactVirtualizedTable rows={files} />
      )}
    </div>
  );
}
