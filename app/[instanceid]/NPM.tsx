"use client";

import Loader from "@/components/widgets/Loader";
import { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { npmInstall } from "./func/npm";
import { useRouter } from "next/navigation";
import { updateConfigs } from "./func/configs";
import InstanceModel from "@/models/instance/instance_model";


const NPMInstall = ({hasNodeModules,instanceid}:{hasNodeModules:boolean,instanceid:string}) => {

    const [installing, setInstalling] = useState(false);

    const router = useRouter();

    async function install() {
        const perm = await Swal.fire({
            title: 'Install Node Modules',
            text: 'Do you want to install node modules?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Install it!'
        });
        if (perm.isConfirmed) {
            setInstalling(true);
            await InstanceModel.updateStatus(instanceid,'installing');

            const resp = await npmInstall(instanceid);
            if (!resp) {
                toast.error("Failed to clone")
            } else {
              await InstanceModel.updateStatus(instanceid,'installed');

                toast.success("Node Modules Installed");
                router.refresh();
            }
            setInstalling(false);
        }
    }


    if(hasNodeModules){
        return <></>
    }
    return (
        <div className="my-5 p-5 ring-2 ring-red-700 bg-red-50 text-red-700 flex items-center justify-between">
            <div>
            <img src="/images/npm.png" className="h-10" alt="" />
            <h1>Node Modules not Installed</h1>
            </div>

            <div>
            <button className="btn my-4 bg-red-700 ring-red-700 text-white flex items-center gap-x-2 disabled:bg-gray-500"
                        onClick={install}
                        disabled={installing}
                    >
                        {installing? <>
                        <Loader className="text-white"/>
                        Installing...</>:"Install Now"}
                        </button>
            </div>
        </div>
    );
}

export default NPMInstall;