import readdir, { Stats } from '@jsdevtools/readdir-enhanced';
import { DirentPlus } from './DirentPlus';

export function searchFolders(
  folder: string
): Promise<DirentPlus[] | (DirentPlus | null)[] | null> {
  return readdir
    .async(folder, {
      withFileTypes: true,
      deep: true,
      stats: true,
      basePath: folder,
    })
    .then((files: Stats[]) => {
      return files.map((file) => {
        if (file.isFile()) {
          const fileSplits = file.path.substring(
            file.path.lastIndexOf('\\') + 1
          );
          return {
            path: file.path,
            name: fileSplits,
            lastModified: file.mtime.toISOString(),
          } as DirentPlus;
        }
        return null;
      });
    });
}
