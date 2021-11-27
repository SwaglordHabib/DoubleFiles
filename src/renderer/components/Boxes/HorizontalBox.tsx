import { ReactElement } from 'react';

export function HorizontalBox({
  children,
}: {
  children: ReactElement | ReactElement[];
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
      }}
    >
      {children}
    </div>
  );
}
