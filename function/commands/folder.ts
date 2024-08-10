import { promises as fs } from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';
import Constants from '@/data/const';


export const execAsync = promisify(exec);

export async function folderExists(path: string): Promise<boolean> {
  try {
    const stats = await fs.stat(path);
    return stats.isDirectory();
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return false;
    }
    throw error;
  }
}

export async function fileExist(path:string): Promise<boolean> {
  try {
    const stats = await fs.stat(path);
    return stats.isFile();
  } catch (error: any) {
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
  } catch (error: any) {
    console.error(`An error occurred while creating the folder: ${error.message}`);
    return false;
  }
}

export async function createFolderIfNotExists(path: string): Promise<Boolean> {
  try {
    await fs.access(path);
    return true;
  } catch (error: any) {
    if (error.code === 'ENOENT') {

      await fs.mkdir(path, { recursive: true });
      return true;
    } else {

      console.error(`An error occurred while checking the folder: ${error.message}`);
      return false;
    }
  }
}

export async function executeInProjectDirectory(isntanceId: string): Promise<boolean> {

  try {
    const dir = `${Constants.PROJECT_ROOT}${isntanceId}`;
    process.chdir(dir);
    return true;
  } catch (err) {
    console.error("Error=>", err);
    return false;
  }
}