import OrganizationRepository from "../repositories/organization/OrganizationRepository";
import NodeRepository from "./repositories/node/NodeRepository";
import Exception from "./exceptions/Exception";

export default class SaasUtils {

    static attachUserAndOrgInforDefaultWhenCreateDocument(user: any, workingOrg: any) {

        const attachData: any = {};
        user = user || {};
        attachData.createUserIid = user.iid;
        attachData.createdDate = new Date();
        attachData.updatedUserIid = user.iid;
        attachData.updatedDate = new Date();

        attachData.createOrgIid = workingOrg.iid;
        attachData.updatedOrgIid = workingOrg.iid;

        attachData.orgRootIid = workingOrg.orgRootIid;
        attachData.orgIid = workingOrg.iid;
        attachData.path = workingOrg.path;

        return attachData;
    }

    static attachUserAndOrgInfoDefaultWhenUpdateDocument(user: any, workingOrg: any) {

        const attachData: any = {};
        user = user || {};
        attachData.updatedUserIid = user.iid;
        attachData.updatedDate = new Date();
        attachData.updatedOrgIid = workingOrg.iid;
        return attachData;
    }


    static async getUserAndWorkingOrg(workingRootIid: number, workingOrgIid: number, userIid: number) {

        const nodeRepository = new NodeRepository();

        let workingOrg = null;
        let user: any = null;

        if (userIid) { // check user and org that we are working on
            user = await nodeRepository.getCollectionDetail('user', {iid: userIid}) || {};
            if (user) {
                if (user.orgRootIid !== workingRootIid) {
                    const e = new Exception();
                    e.message = 'You are trying to work with invalid root org';
                    throw e;
                }
                if (!user.orgIids || !user.orgIids.includes(workingOrgIid)) {
                    const e = new Exception();
                    e.message = 'You are trying to work with invalid org';
                    throw e;
                }
            }
        }

        if (workingOrgIid) {
            workingOrg = await nodeRepository.getCollectionDetail('organization', {iid: workingOrgIid});
        }

        return {
            user,
            org: workingOrg
        }

    }

    /**
     * this function will find the org and user that we are working on
     * @param request
     */
    static async getUserAndWorkingOrgFromRequest(request: any) {

        const userIid = parseInt(request.headers["useriid"]) || parseInt(request.headers["userIid"]);
        const workingOrgIid = parseInt(request.headers["orgiid"]) || parseInt(request.headers["orgIid"]);
        const workingRootIid = parseInt(request.headers["orgrootiid"]) || parseInt(request.headers["orgRootIid"]);
        return await SaasUtils.getUserAndWorkingOrg(workingRootIid, workingOrgIid, userIid);
    }
}