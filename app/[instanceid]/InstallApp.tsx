"use client";

import { MdError } from "react-icons/md";
import Swal from "sweetalert2";
import { gitClone } from "./install";
import { useState } from "react";
import Loader from "@/components/widgets/Loader";
import { BsFillLightningChargeFill } from "react-icons/bs";
import toast from "react-hot-toast";

const InstallApp = ({isInstalled}:{isInstalled:boolean}) => {
    if(isInstalled){
        return <div></div>;
    }

    const [cloning, setCloning] = useState(false);

    async function install(){
        const perm = await Swal.fire({
            title: 'Install Sahityotsav app',
  text: 'By installing all the contents in this folder will be cleared',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, Install it!'
        });
        if(perm.isConfirmed){
            setCloning(true);
           const resp = await gitClone();
           if(!resp){
            toast.error("Failed to clone")
           }else{
            toast.success("Sahityotsav App Installed")
           }
           setCloning(false);
        }
    }
    return (
        <div className="border p-10 my-5 bg-red-50">
            <h1 className="text-xl text-red-600  flex items-center gap-x-2  ">
            {cloning? 
           <> <BsFillLightningChargeFill className="text-2xl" /> Processing...</>
           : <><MdError className="text-2xl"/> Sahityotsav App not installed for this instance</>
        }

                </h1>
                {
                    cloning? <div className="flex items-center gap-x-2">
                        <Loader/>
                        <h2 className="py-2">Cloning <span className="bg-gray-200 px-1 font-mono">@fathah/sahityotsav</span>  Repo</h2>
                    </div>:
                    <button className="btn my-4 gbg text-white"
                    onClick={install}
                    >Install Now</button>
                }
                
        </div>
    );
}

export default InstallApp;