import ToastBox from "../common/Toast";

const AdminLayout = (props:any) => {
    return (
        <div className="commonwidth py-10">
            {props.children}

            <ToastBox/>
        </div>
    );
}

export default AdminLayout;