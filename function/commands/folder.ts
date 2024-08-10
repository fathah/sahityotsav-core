import { promises as fs } from 'fs';


export async function folderExists(path: string): Promise<boolean> {
  try {
    const stats = await fs.stat(path);
    return stats.isDirectory();
  } catch (error:any) {
    if (error.code === 'ENOENT') {
      return false;
    }
    throw error;
  }
}


export async function createFolder(path: string): Promise<Boolean> {
    try {
      await fs.mkdir(path, { recursive: true });
      return true;
    } catch (error:any) {
      console.error(`An error occurred while creating the folder: ${error.message}`);
      return false;
    }
  }

 export async function createFolderIfNotExists(path: string): Promise<Boolean> {
    try {
      await fs.access(path);
      return true;
    } catch (error:any) {
      if (error.code === 'ENOENT') {
       
        await fs.mkdir(path, { recursive: true });
        return true;
      } else {
       
        console.error(`An error occurred while checking the folder: ${error.message}`);
        return false;
      }
    }
  }