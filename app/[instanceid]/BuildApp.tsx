"use client";

import { MdError } from "react-icons/md";
import Swal from "sweetalert2";
import { useState } from "react";
import Loader from "@/components/widgets/Loader";
import { BsFillLightningChargeFill } from "react-icons/bs";
import toast from "react-hot-toast";
import { buildApp } from "./func/build";
import { useRouter } from "next/navigation";

const BuildApp = ({ instance }: { instance: string }) => {
  

    const [building, setBuilding] = useState(false);
    const router = useRouter();

    async function install() {
        const perm = await Swal.fire({
            title: 'Build the app',
            text: 'Do you want to build the current code?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Build Now'
        });
        if (perm.isConfirmed) {
            setBuilding(true);
            const resp = await buildApp(instance);
            if (!resp) {
                toast.error("Failed to Build")
            } else {
                toast.success("Prodcution App Built");
                router.refresh();
            }
            setBuilding(false);
        }
    }
    return (
        <div className="border px-5  my-5 bg-primary bg-opacity-5 ring-2 ring-primary flex justify-between">
            <h1 className="text-xl flex items-center gap-2 text-primaryDark">
                <BsFillLightningChargeFill className="text-2xl"/>  Build the app for production</h1>

                <button className="btn my-4 bg-primary text-white flex items-center gap-x-2 disabled:bg-gray-500"
                        onClick={install}
                        disabled={building}
                    >
                        {building? <>
                        <Loader className="text-white"/>
                        Building...</>:"Build Now"}
                        </button>

        </div>
    );
}

export default BuildApp;