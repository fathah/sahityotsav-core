import AdminLayout from "@/components/layouts/AdminLayout";
import InstanceModel from "@/models/instance/instance_model";
import Link from "next/link";
import { MdLabelImportantOutline } from "react-icons/md";

const IndexPage = async() => {
  const instances = await InstanceModel.getAllInstance();
  return (
    <AdminLayout>
     <main>
     <section className="flex items-center justify-between">
     <h1 className="text-3xl font-bold">Instances</h1>
     <Link className="btn gbg text-white" href={'/new'}>New Instance</Link>
     </section>
    <section className="grid lg:grid-cols-4 gap-5">
    {
      instances.map((instance:any) => {
        return (
          <Link href={`/${instance.id}`} className="border p-5">
            <h3 className="font-bold">{instance.name}</h3>
            <h6 className="text-xs flex items-center gap-x-1"> 
              <MdLabelImportantOutline className="text-lg"/>  
              {instance.port}</h6>
            </Link>
        )
      })
     }
    </section>
     </main>
    </AdminLayout>
  );
}

export default IndexPage;