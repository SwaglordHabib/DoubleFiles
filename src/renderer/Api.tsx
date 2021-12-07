import { DirentPlus } from '../main/util/DirentPlus';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Api {
  ipcRenderer: {
    openDialog(): void;
    scanFolder(folder: string): Promise<DirentPlus[]>;
    openFolder(file: string): void;
    on(channel: string, func: any): void;
    once(channel: string, func: any): void;
    invoke(channel: string, func: any): Promise<void>;
  };
}
