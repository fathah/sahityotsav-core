"use server";
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function gitClone(){
    const url = "https://github.com/fathah/sahityotsav.git";
    const cmd = `git clone ${url} .`;

    try {
        const { stdout, stderr } = await execAsync(cmd);
        console.log('Git clone output:', stdout);
        if (stderr) {
          console.error('Git clone errors:', stderr);
          return false;
        }else{
            return true;
        }
      } catch (error:any) {
        console.error('An error occurred during git clone:', error.message);
        return false;
      }

}