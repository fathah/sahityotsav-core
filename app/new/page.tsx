import AdminLayout from "@/components/layouts/AdminLayout";
import AddForm from "./Form";

const NewInstance = () => {
    return (
        <AdminLayout>
            <h1 className="text-2xl font-bold">New Instance</h1>
            <section className="lg:w-5/12">
            <AddForm/>
            </section>
        </AdminLayout>
    );
}

export default NewInstance;