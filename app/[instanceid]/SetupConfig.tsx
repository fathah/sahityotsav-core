"use client";

import { useEffect, useState } from "react";
import { getConfigFile, getEnvFile } from "./func/configs";
import { CodeiumEditor } from "@codeium/react-code-editor";

const SetupConfig = ({instance}:{instance:any}) => {
   const [configs, setConfigs] = useState("");
   const [env, setEnv] = useState("");

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
                    setConfigs( cont);
                }
            });

            getEnvFile(instance?.id).then((cont)=>{
                if(cont){
                    setEnv(cont);
                }
            });
        }
    },[instance]);

    return (
        <div className="py-10">

<h1 className="text-2xl font-bold mb-2 ">Setup .env File</h1>
                  <CodeiumEditor 
                  language="typescript" 
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



        </div>
    );
}

export default SetupConfig;