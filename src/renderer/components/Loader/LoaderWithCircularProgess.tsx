import { CircularProgress, Paper } from '@mui/material';
import { ReactElement } from 'react';
import { Loadable } from './Loadable';
import { State } from './State';

export function LoaderWithCircularProgess<T>({
  lodable,
  children,
}: {
  lodable: Loadable<T>;
  children: (data: T) => ReactElement;
}): ReactElement {
  switch (lodable.state) {
    case State.finished:
      return children(lodable.data);
    case State.error:
      return <span>Error occured</span>;
    case State.inital:
      return (
        <Paper
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <></>
        </Paper>
      );
    case State.loading:
    default:
      return (
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
      );
  }
}
