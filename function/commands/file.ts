import { promises as fs } from 'fs';

export async function writeFileContent(path: string, content: string): Promise<void> {
  try {
    await fs.writeFile(path, content, { flag: 'w' });
  } catch (error: any) {
    throw error;
  }
}
