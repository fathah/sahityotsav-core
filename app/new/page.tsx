import AdminLayout from "@/components/layouts/AdminLayout";
import AddForm from "./Form";
import InstanceModel from "@/models/instance/instance_model";

const NewInstance = async() => {
    const nextPort = await InstanceModel.getNextPort();
    return (
        <AdminLayout>
            <h1 className="text-2xl font-bold">New Instance</h1>
            <section className="lg:w-5/12">
            <AddForm nextPort={nextPort}/>
            </section>
        </AdminLayout>
    );
}

export default NewInstance;