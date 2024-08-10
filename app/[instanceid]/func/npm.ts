"use server";

import { execAsync, executeInProjectDirectory } from "@/function/commands/folder";



export async function npmInstall(instId:string){
   
    const cmd = `npm install`;

    const previousDirectory = process.cwd();
    let resp = false;
    try {

        await executeInProjectDirectory(instId)
        
        const { stdout, stderr } = await execAsync(cmd);

        console.log('Git STD: ',stdout);
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