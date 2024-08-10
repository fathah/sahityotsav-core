import prisma from "@/data/prisma";
import { InstanceStatus } from "@/types/instance";


export default class InstanceModel{
    static async getAllInstance(){
        return await prisma.instance.findMany();
    }

    static async getNextPort(){
        const res = await prisma.instance.findMany({
            orderBy:{
                port:"desc"
            },
            take:1
        })

        if(res.length<1){
            return 3001;
        }
        return res[0].port+1
    }

    static async single(id:string){
        return await prisma.instance.findFirst({where:{id}})
    }

    static async createInstance(name:string, port:number, domain:string){
        try {
            const exist = await prisma.instance.findFirst({
                where:{
                    domain
                }
            })
            if(exist){
                return {code:1, message: "Domain already in use"}
            }

            const portused = await prisma.instance.findFirst({
                where:{
                    port
                }
            })

            if(portused){
                return {code:1, message: "PORT already in use"}
            }

          const res =   await prisma.instance.create({
                data:{
                    name,
                    port,
                    domain,

                }
            })

            return {code:0, message: "Instance Created", id:res.id}
        } catch (error) {
            console.log(error);
            return {code:1, message: "Something went wrong"}
            
        }
    }


    static async updateStatus(id:string, status:InstanceStatus){
        try {
            const exist = await prisma.instance.findFirst({
                where:{
                    id
                }
            })
            if(!exist){
                return {code:1, message: "Instance does not exist"}
            }


          const res =   await prisma.instance.update({
            where:{
                id
            },
                data:{
                    status

                }
            })

            return {code:0, message: "Instance Status Updated", id:res.id}
        } catch (error) {
            console.log(error);
            return {code:1, message: "Something went wrong"}
            
        } 
    }
}