import * as fs from 'fs';
import { Dirent } from 'fs';
import { DirentPlus } from '../DirentPlus';

export function searchFolders(
  folder: string,
  files: DirentPlus[],
  folders: string[]
) {
  fs.readdirSync(folder, { withFileTypes: true }).forEach(
    (fileOrFolder: Dirent) => {
      if (fileOrFolder.isFile()) {
        files.push({
          path: `${folder}\\${fileOrFolder.name}`,
          ...fileOrFolder,
          lastModified: fs
            .statSync(`${folder}\\${fileOrFolder.name}`)
            .mtime.toISOString(),
        } as DirentPlus);
      } else {
        searchFolders(`${folder}/${fileOrFolder.name}`, files, folders);
      }
    }
  );
}
