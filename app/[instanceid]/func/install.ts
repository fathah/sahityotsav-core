"use server";

import { execAsync, executeInProjectDirectory } from "@/function/commands/folder";



export async function gitClone(instId:string){
    const url = "https://github.com/fathah/sahityotsav.git";
    const cmd = `git clone ${url} .`;

    const previousDirectory = process.cwd();
    let resp = false;
    try {

        await executeInProjectDirectory(instId)
        
        const { stdout, stderr } = await execAsync(cmd);

        console.error('Git Error: ',stderr);
        
        resp =  true;
      } catch (error:any) {
        console.error('An error occurred during git clone:', error.message);
        resp =  false;
      }finally{
        process.chdir(previousDirectory);
        return resp;
      }

}