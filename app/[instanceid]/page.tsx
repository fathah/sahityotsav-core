import AdminLayout from "@/components/layouts/AdminLayout";
import Constants from "@/data/const";
import { createFolderIfNotExists, folderExists } from "@/function/commands/folder";
import InstanceModel from "@/models/instance/instance_model";
import InstallApp from "./InstallApp";
import BuildApp from "./BuildApp";
import NPMInstall from "./NPM";
import { isReadyForBuild } from "./func/build";
import SetupConfig from "./SetupConfig";

const InstanceEdit = async({params}:{params:any}) => {
    const {instanceid} = params;

    if(!instanceid){
        return <div>ID Not Found</div>
    }

    const instance  = await InstanceModel.single(instanceid);

    const createFolder = await createFolderIfNotExists(`${Constants.PROJECT_ROOT}${instanceid}`);
    const isInstalled = await folderExists(`${Constants.PROJECT_ROOT}${instanceid}/app`)
    const hasNodeModules = await folderExists(`${Constants.PROJECT_ROOT}${instanceid}/node_modules`);

    const buildOk = await isReadyForBuild(instanceid);

    return (
        <AdminLayout>
           <h1 className="text-2xl ">{instance?.name}</h1>
           <h6 className="text-sm text-gray-400">{instance?.domain}</h6>
           <h6 className="inline text-xs bg-primary text-white px-2 py-1">PORT: {instance?.port}</h6>

           {!createFolder && <div className="py-20 fullcenter text-center border bg-red-50 my-5 text-red-600">
            Couldnt create project folder. Please check console.
           </div> }

           <InstallApp instance={instanceid} isInstalled={isInstalled}/>
           {isInstalled && <NPMInstall hasNodeModules={hasNodeModules} instanceid={instanceid}/>}
           {
            !buildOk.success && <SetupConfig instance={instance}/>
           }
           {isInstalled && hasNodeModules && buildOk.success && <BuildApp instance={instanceid}/>}
           
        </AdminLayout>
    );
}

export default InstanceEdit;