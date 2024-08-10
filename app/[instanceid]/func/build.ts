"use server";

import Constants from "@/data/const";
import { execAsync, executeInProjectDirectory, fileExist, folderExists } from "@/function/commands/folder";


export async function isReadyForBuild(instId:string){
    try {
        const projectFolder = `${Constants.PROJECT_ROOT}${instId}`;
        const folderExist = await folderExists(projectFolder)
        if(!folderExist){
            return {success:false, message:"Project Folder not found"};
        }
        const configExist = await fileExist(`${projectFolder}/configs.ts`);
        if(!configExist){
            return {success:false, message:"Config File not found"};
        }
        const envExist = await fileExist(`${projectFolder}/.env`);
        if(!envExist){
            return {success:false, message:".env not found"};
        }

        return {success:true, message:"Ready for Build"};
    } catch (error) {
        console.error("Build Check Error=>", error);
        return {success:false, message:"Build Check Error"};

        
    }
}


export async function buildApp(instId:string){
   
    const cmd = `npm run build`;

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