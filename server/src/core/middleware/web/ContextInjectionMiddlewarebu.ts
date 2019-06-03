// import {ExpressMiddlewareInterface, Middleware} from "routing-controllers";
// import NodeRepository from "../../repositories/node/NodeRepository";
// import {ModelConfigs} from "../../../model/Configs";
// import IUser from "../../entities/ientities/IUser";
// import Repository from "../../repositories/Repository";
// import AnonymousApi from "../../../configs/AnonymousApi";
// import IOrganization from "../../entities/ientities/IOrganization";
// import OrganizationRepository from "../../../repositories/organization/OrganizationRepository";
// import Exception from "../../exceptions/Exception";
//
// @Middleware({type: "before"})
// export class ContextInjectionMiddleware implements ExpressMiddlewareInterface {
//
//     async use(request: any, response: any, next: (err?: any) => any) {
//         const nodeRepository = new NodeRepository();
//         // console.log(request.headers);
//         if (AnonymousApi.Verify(request.originalUrl)) {
//             next();
//             return;
//         }
//
//         const userIid = parseInt(request.headers["useriid"]) || parseInt(request.headers["userIid"]);
//         const workingOrgIid = parseInt(request.headers["orgiid"]) || parseInt(request.headers["orgIid"]);
//         const workingRootIid = parseInt(request.headers["rootiid"]) || parseInt(request.headers["rootIid"]);
//         const nodeAction: string = request.headers["nodeaction"] || request.headers["nodeAction"];
//
//         const orgRepository = new OrganizationRepository();
//         let workingOrg = null;
//
//         let user: any = {};
//         if (userIid) { // check user and org that we are working on
//             user = await nodeRepository.getCollectionDetail('user', {iid: userIid}) || {};
//             if (user) {
//                 if (user.orgRootIid !== workingRootIid) {
//                     const e = new Exception();
//                     e.message = 'You are trying to work with invalid root org';
//                     throw e;
//                 }
//                 if (!user.orgIids || !user.orgIids.includes(workingOrgIid)) {
//                     const e = new Exception();
//                     e.message = 'You are trying to work with invalid org';
//                     throw e;
//                 }
//             }
//         }
//
//         let workingOrg = await orgRepository.findOne({iid: workingOrgIid});
//
//         const query = request.query || {};
//         const body = request.body || {};
//         let injectData: any = {};
//         const clientData = {...body, ...query};
//
//         //TODO: find the document that can be share from another org
//         if (nodeAction === 'create') { // When  create the document, we will trying to add the org of create user to the document
//             injectData = await this.addCreateInfo(user, clientData, workingOrg);
//         } else if (nodeAction === 'update') { // update path
//             injectData = await this.addUpdateInfo(user, clientData);
//         } else {//if (nodeAction === 'find' || nodeAction === 'search') { // when find data, only show the data that belong to the org
//             const orgIids = user.orgIids && user.orgIids.length > 0 ? user.orgIids : [user.orgRootIid];
//             injectData.orgRootIid = user.orgRootIid;
//             if (!orgIids || orgIids.length === 0) {
//                 const e = new Exception();
//                 e.message = 'security exception. User login do not belong the org';
//                 throw e;
//             }
//
//
//             const orgs: any[] = await orgRepository.find({iid: {$in: orgIids}});
//             const paths = this.getPathsAsFind(orgs);
//             if (paths && paths.length > 1) {
//                 injectData.paths = {$in: paths};
//                 injectData.path = {$in: paths};
//             } else if (paths && paths.length === 1) {
//                 injectData.paths = paths[0];
//                 injectData.path = paths[0];
//             }
//         }
//         console.log('...body, ...injectData}', {...body, ...injectData});
//         request.query = {...query, ...injectData};
//         request.body = {...body, ...injectData};
//         next();
//
//     }
//
//     private static createRegex(path: string) {
//         // return new RegExp(userInput, "i");
//         return new RegExp(path);
//     }
//
//     async addCreateInfo(user: IUser, clientData: any, workingOrg: IOrganization) {
//         let org: any = await this.getOrgOfNewDocument(user, clientData);
//         const orgIid = user.orgIids && user.orgIids.length > 0 ? user.orgIids[0] : user.orgRootIid;
//
//         const attachData: any = {...this.detectAttachedData(org)};
//
//         attachData.createUserIid = user.iid;
//         attachData.createdDate = new Date();
//         attachData.updatedUserIid = user.iid;
//         attachData.updatedDate = new Date();
//         attachData.createOrgIid = orgIid;
//         attachData.updatedOrgIid = orgIid;
//
//         return attachData;
//     }
//
//     async addUpdateInfo(user: IUser, clientData: any) {
//         let org: IOrganization = await this.getOrgData(user, clientData);
//         const userOrgIid = user.orgIids && user.orgIids.length > 0 ? user.orgIids[0] : user.orgRootIid;
//
//         const attachData: any = {...this.detectAttachedData(org)};
//         attachData.updatedUserIid = user.iid;
//         attachData.updatedOrgId = userOrgIid;
//         attachData.updatedDate = new Date();
//
//         return attachData;
//     }
//
//     /**
//      *
//      * @param user
//      * @param clientData
//      */
//     async getOrgOfNewDocument(user: IUser, clientData: any) {
//         const nodeRepository = new NodeRepository();
//
//         const orgData = this.getOrgData(user, clientData);
//         if (orgData !== null) {
//             return orgData;
//         }
//
//         if (user.orgIids && user.orgIids.length >= 1) { //user.orgIids.length === 1
//             return await nodeRepository.getCollectionDetail('organization', {iid: user.orgIids[0]});
//         }
//
//         return await nodeRepository.getCollectionDetail('organization', {iid: user.orgRootIid});
//
//     }
//
//     detectAttachedData(org: any) { // org or orgs
//         const attachData: any = {};
//         if (org === null) {
//             return {};
//         }
//         if (Array.isArray(org)) { //&& org.length > 1
//
//             const {orgIids, paths} = this.getPaths(org);
//
//             attachData.orgIids = orgIids;
//             attachData.orgRootIid = org[0].orgRootIid;
//             attachData.paths = paths;
//         } else {
//             // if(Array.isArray(org) && org.length === 1) {
//             //     org = org[0];
//             // }
//             attachData.orgIid = org.iid;
//             attachData.orgRootIid = org.orgRootIid;
//             attachData.path = org.path ? `${org.path}_${attachData.orgIid}` : `_${attachData.orgIid}`;
//         }
//         return attachData;
//     }
//
//     getPaths(orgs: any[]) {
//         const orgIids: number[] = [];
//         const paths: string[] = [];
//         orgs.map(org => {
//             orgIids.push(org.iid);
//             paths.push(org.path ? `${org.path}${org.iid}_` : `_${org.iid}_`);
//         });
//
//         return {orgIids, paths};
//     }
//
//     getPathsAsFind(orgs: any[]) {
//         const orgIids: number[] = [];
//         const paths: any[] = [];
//         orgs.map(org => {
//             orgIids.push(org.iid);
//             const p = org.path ? org.path : `_${org.iid}_`;
//             paths.push(new RegExp(p));
//         });
//
//         return paths;
//     }
//
//     /**
//      * This function will get data the request from client
//      *
//      * @param user
//      * @param clientData
//      */
//     async getOrgData(user: IUser, clientData: any) {
//         const nodeRepository = new NodeRepository();
//
//         // TODO: super admin can work without this case
//         if (clientData.orgIid) {
//             const org = await nodeRepository.getCollectionDetail('organization', {iid: parseInt(clientData.orgIid)});
//             if (Repository.userCanWorkOnOrg(user, org)) {
//                 return org;
//             } else {
//                 const e = new Exception();
//                 e.message = 'you cannot working on the organization %s';
//                 e.messageParams = [org.name];
//                 throw e;
//             }
//             return null
//         }
//
//         if (clientData.orgIids) {
//             var orgIids = clientData.orgIids.map((iid: string) => {
//                 return parseInt(iid);
//             });
//             const orgResult: number[] = [];
//
//             const orgs = await nodeRepository.findAll('organization', {iid: {$in: orgIids}});
//
//             for (let i = 0; i < orgs.length; i++) {
//                 if (Repository.userCanWorkOnOrg(user, orgs[i])) {
//                     orgResult.push(orgs[i]);
//                 }
//             }
//             if (orgResult.length > 0) {
//                 return orgResult;
//             }
//
//         }
//         return null;
//     }
// }
