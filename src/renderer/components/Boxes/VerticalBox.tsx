import { ReactElement } from 'react';

export function VerticalBox({ children }: { children: ReactElement[] }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: '1',
        padding: '2rem',
      }}
    >
      {children}
    </div>
  );
}
