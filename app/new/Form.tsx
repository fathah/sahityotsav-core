"use client";

import { ZFormInput, ZSubmitButton } from "@/components/widgets/Form";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { createInstance } from "./func";
import toast from "react-hot-toast";

const AddForm = ({nextPort}:{nextPort:number}) => {

    const [loading, setLoading]=useState(false);


    const formik = useFormik({
        initialValues:{
            name:"",
            port:nextPort,
            domain:""
        },
        validationSchema: Yup.object({
            name:Yup.string().required("Name is required"),
            port:Yup.number().required("Port is required"),
            domain:Yup.string().required("Domain is required")
        }),
        onSubmit:async(val)=>{
            setLoading(true);
            const resp = await createInstance(val.name, val.port!, val.domain);
            if(resp?.code===0){
                toast.success(resp.message);
                window.location.replace(`/${resp.id}`);
                
            }else{
                toast.error(resp?.message??"Failed to Add Instance");
            }
            setLoading(false);
        }
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <ZFormInput formLabel="Name" formik={formik} name="name"/>
            <ZFormInput formLabel="Port" formik={formik} name="port" placeHolder="Eg: 3001" type="number"/>
            <ZFormInput formLabel="Domain" formik={formik} name="domain" placeHolder="Eg: place.sahityotsav.com"/>
            <ZSubmitButton loadText="Creating Instance" loading={loading} text="Create Instance"/>

        </form>
    );
}

export default AddForm;