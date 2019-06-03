'use strict';
import {Inject} from "typedi";
import {
    Get, Post, Controller, Body, QueryParam,
    QueryParams, BodyParam, Authorized, HeaderParam, UploadedFile, JsonController
} from "routing-controllers";
import {Failure, FailureWithException, Success, Warning} from "../../core/responseable/Result";
import NodeRepository from "../../core/repositories/node/NodeRepository";
import Status from "../../configs/Status";
import UserRepository from "../../repositories/UserRepository";
import IUser from "../../core/entities/ientities/IUser";
import UserService from "../../services/UserService";
import IDomain from "../../model/interfaces/mongo/IDomain";
import DomainRepository from "../../repositories/DomainRepository";
import OrganizationRepository from "../../repositories/organization/OrganizationRepository";

@JsonController('/site')
class NodeController {

    @Inject('nodeRepository')
    nodeRepository: NodeRepository;
    @Inject('organizationRepository')
    organizationRepository: OrganizationRepository;
    @Inject('domainRepository')
    domainRepository: DomainRepository;
    @Inject('userService')
    userService: UserService;
    @Get("/upload1")
    uploadAction1(@UploadedFile("file") file: any) {
        return Success.setMessage(`organization has bean created!...`);
    }
    @Post("/init-org")
    async initOrgAction(@Body() data: any = {}, @HeaderParam('node') collection: string) {
        let r = null;
        if (!data.iid) {
            r = await this.organizationRepository.create(data);
            if (r === null) {
                return Warning.setMessage(`organization has not bean created!...`)
            }
            // TODO: CUSTOM counter
            r.orgRootIid = r.iid;
            r.path = `_${r.iid}_`;
            await this.organizationRepository.updateByIid(r.iid, r);
            return Success.setResult(r).setMessage(`organization has bean created!...`);
        }

        r = await this.organizationRepository.updateByIid(data.iid, data);
        if (r === null) {
            return Warning.setMessage(`organization has not bean updated!...`)
        }
        return Success.setResult(r).setMessage(`organization has bean updated!...`);

    }

    @Post("/init-user")
    async initUserAction(@Body() data: IUser, @HeaderParam('node') collection: string) {
        let r = null;
        if (!data.iid) {
            r = await this.userService.createOwnerOfOrg(data);
            if (r === null) {
                return Warning.setMessage(`admin info has not bean created!...`)
            }
            return Success.setResult(r).setMessage(`admin info has bean created!...`);
        }

        r = await this.userService.update(data);
        if (r === null) {
            return Warning.setMessage(`admin info has not bean updated!...`)
        }
        return Success.setResult(r).setMessage(`admin info has bean updated!...`);

    }

    @Post("/init-domain")
    async initDomainAction(@Body() data: IDomain, @HeaderParam('node') collection: string) {
        try {
            let r = null;
            if (!data.iid) {
                r = await this.domainRepository.createDomain(data);
                if (r === null) {
                    return Warning.setMessage(`domain has not bean created!...`)
                }
                return Success.setResult(r).setMessage(`domain has bean created!...`);
            }

            r = await this.domainRepository.updateByIid(data.iid, data);
            if (r === null) {
                return Warning.setMessage(`domain has not bean updated!...`)
            }
            return Success.setResult(r).setMessage(`domain has bean updated!...`);

        } catch (e) {
            return FailureWithException(e);
        }
    }

    @Get("/find")
    async findAction(@QueryParams() params: any = {}, @HeaderParam('node') collection: string,
                     @HeaderParam("attachedNodes") attachedNodes: string) {

        try {
            const r = await this.nodeRepository.find(collection, params, attachedNodes);
            return Success.clearMessage().setResult(r);
        } catch (e) {
            return FailureWithException(e);
        }
    }

    // @Authorized('org:create_org')
    @Get("/detail")
    async detailAction(@QueryParams() params: any = {}, @HeaderParam('node') collection: string) {
        try {
            const r = await this.nodeRepository.getCollectionDetail(collection, params);
            if (!r) {
                return Warning.setMessage(`${collection} not found!...`)
            }
            return Success.setResult(r);
        } catch (e) {
            return FailureWithException(e);
        }
    }
}

export default NodeController;
