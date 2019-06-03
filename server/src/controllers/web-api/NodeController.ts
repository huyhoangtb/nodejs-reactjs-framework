'use strict';
import {Inject} from "typedi";
import {
    Get, Post, Controller, Body, QueryParam,
    QueryParams, BodyParam, Authorized, HeaderParam
} from "routing-controllers";
import {Failure, FailureWithException, Success, Warning} from "../../core/responseable/Result";
import NodeRepository from "../../core/repositories/node/NodeRepository";
import Status from "../../configs/Status";

@Controller('/node')
class NodeController {

    @Inject('nodeRepository')
    nodeRepository: NodeRepository;

    @Get("/checkDuplicate")
    async validateAction(@BodyParam('value') value: any, @BodyParam('fields') fields: string, @HeaderParam('node') collection: string) {
        try {
            const r = await this.nodeRepository.nodeIsExisted(collection, fields, value);
            return Success.setResult(r);
        } catch (e) {
            return FailureWithException(e);
        }
    }

    @Post("/create")
    @Authorized('CREATE_NODE')
    async createAction(@Body() data: any = {}, @HeaderParam('node') collection: string) {
        try {
            const r = await this.nodeRepository.create(collection, data);
            if(r === null) {
                return Warning.setMessage(`${collection} has not bean created!...`)
            }
            return Success.setResult(r).setMessage(`${collection} has bean created!...`);
        } catch (e) {
            return FailureWithException(e);
        }
    }

    @Post("/update")
    @Authorized('UPDATE_NODE')
    async updateAction(@Body() data: any = {}, @HeaderParam('node') collection: string) {
        try {
            const r = await this.nodeRepository.update(collection, data);
            if(r === null) {
                return Warning.setMessage(`${collection} has not bean updated!...`)
            }
            return Success.setResult(r).setMessage(`${collection} has bean updated!...`);
        } catch (e) {
            return FailureWithException(e);
        }
    }

    @Get("/find-by-iids")
    @Authorized('FIND_NODE')
    async findByIidsAction(@QueryParams() params: any = {},@QueryParam('iids') iids: number[], @HeaderParam('node') collection: string,
                     @HeaderParam("attachedNodes") attachedNodes: string) {
        params = {...params, iids}
        try {
            const r = await this.nodeRepository.findAllByIids(collection, params, attachedNodes);
            return Success.clearMessage().setResult(r);
        } catch (e) {
            return FailureWithException(e);
        }
    }

    @Get("/find")
    @Authorized('FIND_NODE')
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
    @Authorized('VIEW_NODE')
    async detailAction(@QueryParams() params: any = {}, @QueryParam('iid') iid: number, @HeaderParam('node') collection: string,
                       @HeaderParam("attachedNodes") attachedNodes: string) {
        params = {...params, iid};
        console.log('params', params);
        try {
            const r = await this.nodeRepository.getCollectionDetail(collection, {...params, iid}, attachedNodes);
            if(!r) {
                return Warning.setMessage(`${collection} not found!...`)
            }
            return Success.setResult(r);
        } catch (e) {
            return FailureWithException(e);
        }
    }
}

export default NodeController;
