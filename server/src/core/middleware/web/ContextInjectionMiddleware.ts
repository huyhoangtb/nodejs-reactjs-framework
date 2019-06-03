import {ExpressMiddlewareInterface, Middleware} from "routing-controllers";
import NodeRepository from "../../repositories/node/NodeRepository";
import {ModelConfigs} from "../../../model/Configs";
import IUser from "../../entities/ientities/IUser";
import Repository from "../../repositories/Repository";
import AnonymousApi from "../../../configs/AnonymousApi";
import IOrganization from "../../entities/ientities/IOrganization";
import OrganizationRepository from "../../../repositories/organization/OrganizationRepository";
import Exception from "../../exceptions/Exception";
import SaasUtils from "../../SaasUtils";

@Middleware({type: "before"})
export class ContextInjectionMiddleware implements ExpressMiddlewareInterface {

    async use(request: any, response: any, next: (err?: any) => any) {
        const nodeRepository = new NodeRepository();
        // console.log(request.headers);
        if (AnonymousApi.Verify(request.originalUrl)) {
            next();
            return;
        }

        const nodeAction: string = request.headers["nodeaction"] || request.headers["nodeAction"];
        const {user, org} = await SaasUtils.getUserAndWorkingOrgFromRequest(request);

        const query = request.query || {};
        const body = request.body || {};
        let injectData: any = {};

        if (nodeAction === 'create') { // When  create the document, we will trying to add the org of create user to the document
            injectData = SaasUtils.attachUserAndOrgInforDefaultWhenCreateDocument(user, org);
        } else if (nodeAction === 'update') { // update path
            injectData = SaasUtils.attachUserAndOrgInfoDefaultWhenUpdateDocument(user, org);
        } else {
            if(org) {
                injectData.orgRootIid = org.orgRootIid;
                // injectData.orgIid = org.iid;
                injectData.path = org.path;
                injectData.paths = {$in: [org.path]};
            } else {
                injectData.orgRootIid = 0;
                // injectData.orgIid = org.iid;
                injectData.path = '--';
                injectData.paths = {$in: ['--']};
            }
        }

        request.query = {...query, ...injectData};
        request.body = {...body, ...injectData};
        next();

    }
}
