"use client";

import { useEffect, useState } from "react";
import { getConfigFile, getEnvFile, updateConfigs } from "./func/configs";
import { CodeiumEditor } from "@codeium/react-code-editor";
import toast from "react-hot-toast";
import { ZSubmitButton } from "@/components/widgets/Form";
import { useRouter } from "next/navigation";
import InstanceModel from "@/models/instance/instance_model";
import Link from "next/link";

const EditConfigs = ({instance}:{instance:any}) => {
   const [configs, setConfigs] = useState("");
   const [env, setEnv] = useState("");

   const [loading, setLoading] = useState(false);

   useEffect(()=>{
    if(typeof window !== 'undefined'){
        const refer = document.getElementsByTagName('svg');
        for(let i=0;i<refer.length;i++){
            refer[i].style.display = 'none';
        }
       
    }
},[])


    useEffect(()=>{
        if(instance?.id){
            getConfigFile(instance?.id).then((cont)=>{
                if(cont){
                    const newCont = cont.replace('domain: "mysite.com"',`domain: "${instance?.domain}"`);
                    setConfigs(newCont);
                }
            });

            getEnvFile(instance?.id).then((cont)=>{
                if(cont){
                    setEnv(cont);
                }
            });
        }
    },[instance]);

    const router = useRouter();

    function handleSubmit(e:any){
        e.preventDefault();
        setLoading(true);
        updateConfigs(instance?.id, configs, env).then(async(res)=>{
            if(res){
                await InstanceModel.updateStatus(instance?.id,'configset');

                toast.success("Configs Updated");
                router.refresh();
            }else{
                toast.error("Failed to update configs");
            }
        });
        setLoading(false);
        
    }
    return (
        <form className="py-10" onSubmit={handleSubmit}>

<h1 className="text-2xl font-bold mb-4 flex justify-between items-center ">Setup .env File

    <div>
    <Link href='https://developers.ziqx.cc/console/669d15b31ff5f'
    target="_blank"
    className="bg-primary text-xs text-white py-2 px-2"
    >Get App Key</Link>
    </div>
</h1>
                  <CodeiumEditor 
                  language="env" 
                  theme="vs-dark"
                  value={env}
                  onChange={(e)=>setEnv(e!)}
                  height={100}
                  />

            <h1 className="text-2xl font-bold mb-2 mt-4">Setup Config File</h1>
                  <CodeiumEditor 
                  language="typescript" 
                  theme="vs-dark"
                  value={configs}
                  height={400}
                  onChange={(e)=>setConfigs(e!)}
                  />

                  <ZSubmitButton
                  loadText="Updating..."
                  loading={loading}
                  text="Update Configs"
                  />

        </form>
    );
}

export default EditConfigs;