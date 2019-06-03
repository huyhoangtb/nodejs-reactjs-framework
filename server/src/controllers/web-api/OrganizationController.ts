'use strict';
import {Inject} from "typedi";
import {Get, Post, Controller, Body, Param, QueryParam} from "routing-controllers";
import {default as OrganizationRepository} from "../../repositories/organization/OrganizationRepository";
import {Success} from "../../core/responseable/Result";
import Organization from "../../model/mongo/Organization";
import * as mongoose from "mongoose";

@Controller("/organization")
class OrganizationController {

    @Inject('organizationRepository')
    organizationRepository: OrganizationRepository;

    // @Authorized('new')
    @Post("/new")
    async newOrg(@Body() orgData: object) {
        const org = new Organization(orgData);
        const r = await org.save();
        return Success.setMessage('fasdfadsfa').setResult(r.toObject());
    }

// @Authorized('create_org')
    @Get("/search")
    async search() {
        const r = await this.organizationRepository.findAllRawData();
        return Success.setResult(r).setMessage('ầdsfads');
    }

    // @Authorized('create_org')
    @Get("/load")
    async get(@QueryParam('iid') iid: number) {

        const r = await mongoose.model('user').findOne({iid});
        // const r = await User.findOne({iid: 5}).lean();
        // const r = await this.organizationRepository.findByIid(iid);
        return Success.setResult(r);
    }
}

export default OrganizationController;
