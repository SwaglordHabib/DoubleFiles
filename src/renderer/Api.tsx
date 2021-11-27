/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Api {
  ipcRenderer: {
    openDialog(): void;
    scanFolder(folder: string): void;
    openFolder(file: string): void;
    on(channel: string, func: any): void;
    once(channel: string, func: any): void;
  };
}
