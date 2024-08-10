import AdminLayout from "@/components/layouts/AdminLayout";
import InstanceModel from "@/models/instance/instance_model";
import Link from "next/link";
import { MdLabelImportant } from "react-icons/md";

const IndexPage = async() => {
  const instances = await InstanceModel.getAllInstance();
  return (
    <AdminLayout>
     <main>
     <section className="flex items-center justify-between mb-5">
     <h1 className="text-3xl font-bold">Instances</h1>
     <Link className="btn gbg text-white" href={'/new'}>New Instance</Link>
     </section>
    <section className="grid lg:grid-cols-4 gap-5">
    {
      instances.map((instance:any) => {
        return (
          <div  className="border shadow-lg p-6 ring-primary hover:ring-2 duration-300">
            <h3 className="font-bold">{instance.name}</h3>
            <h6 className="text-xs flex items-center gap-x-1 text-green-600"> 
              <MdLabelImportant className="text-lg"/>  
              {instance.port}</h6>
              <p className="text-xs text-gray-500 my-1">{instance.domain}</p>
              <section className="flex gap-2 text-xs mt-2">
                <Link href={`/${instance.id}`}
                className="bg-primary text-white px-3 py-2"
                >Manage</Link>
                <Link href={`https://${instance.domain}`}
                className="bg-red-700 text-white px-3 py-2"
                 target="_blank">View Site</Link>

              </section>
            </div>
        )
      })
     }
    </section>
     </main>
    </AdminLayout>
  );
}

export default IndexPage;