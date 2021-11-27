import { Dirent } from 'fs';

export class DirentPlus extends Dirent {
  constructor(public path: string, public lastModified: string) {
    super();
  }
}
