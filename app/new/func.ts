"use server";

import InstanceModel from "@/models/instance/instance_model";
import { revalidatePath } from "next/cache";

export async function createInstance(name:string, port:number, domain:string){
    const resp = await InstanceModel.createInstance(name, port, domain);
    if(resp.code===0){
        revalidatePath("/")
    }
    return resp;
}