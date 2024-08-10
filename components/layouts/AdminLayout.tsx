import ToastBox from "../common/Toast";

const AdminLayout = (props:any) => {
    return (
       <main>
        <nav className="gbg py-6 text-center text-white text-3xl font-bold">
            Sahityotsav Core
        </nav>
         <div className="commonwidth py-10">
            {props.children}

           
        </div>
        <ToastBox/>
       </main>
    );
}

export default AdminLayout;