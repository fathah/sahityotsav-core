"use server";

import Constants from "@/data/const";
import { fileExist } from "@/function/commands/folder";
import { promises as fs } from 'fs';

export async function getConfigFile(instId:string){
    const tsFile = `${Constants.PROJECT_ROOT}${instId}/configs.ts`;
    const txtFile =   `${Constants.PROJECT_ROOT}${instId}/configs.txt`;

    if(await fileExist(tsFile)){
        const content = await fs.readFile(tsFile, 'utf-8');
        return content;
    }
    if(await fileExist(txtFile)){
        const content = await fs.readFile(txtFile, 'utf-8');
        return content;
    }

    return null;
}

export async function getEnvFile(instId:string){
    const envFile = `${Constants.PROJECT_ROOT}${instId}/.env`;
    const txtFile =   `${Constants.PROJECT_ROOT}${instId}/env`;

    if(await fileExist(envFile)){
        const content = await fs.readFile(envFile, 'utf-8');
        return content;
    }
    if(await fileExist(txtFile)){
        const content = await fs.readFile(txtFile, 'utf-8');
        return content;
    }

    return null;
}