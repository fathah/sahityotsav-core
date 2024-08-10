"use client";

import { MdError } from "react-icons/md";
import Swal from "sweetalert2";
import { gitClone } from "./func/install";
import { useState } from "react";
import Loader from "@/components/widgets/Loader";
import { BsFillLightningChargeFill } from "react-icons/bs";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const InstallApp = ({ instance, isInstalled }: { instance: string, isInstalled: boolean }) => {
    if (isInstalled) {
        return <div></div>;
    }

    const [cloning, setCloning] = useState(false);
    const router = useRouter();

    async function install() {
        const perm = await Swal.fire({
            title: 'Install Sahityotsav app',
            text: 'By installing all the contents in this folder will be cleared',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Install it!'
        });
        if (perm.isConfirmed) {
            setCloning(true);
            const resp = await gitClone(instance);
            if (!resp) {
                toast.error("Failed to clone")
            } else {
                toast.success("Sahityotsav App Installed");
                router.refresh();
            }
            setCloning(false);
        }
    }
    return (
        <div className="border p-10 my-5 bg-red-50 inl fullcenter">
            <h1 className=" text-red-600  flex items-center gap-x-2 text-center ">
                {cloning ?
                    <div className="fullcenter ">
                         <BsFillLightningChargeFill className="text-5xl" /> Processing...</div>
                    : <div className="fullcenter"><MdError className="text-5xl" /> Sahityotsav App not installed for this instance</div>
                }

            </h1>
            {
                cloning ? <div className="flex items-center gap-x-2">
                    <Loader />
                    <h2 className="py-2">Cloning <span className="bg-gray-200 px-1 font-mono">@fathah/sahityotsav</span>  Repo</h2>
                </div> :
                    <button className="btn my-4 bg-red-600 ring-red-700 text-white"
                        onClick={install}
                    >Install Now</button>
            }

        </div>
    );
}

export default InstallApp;