'use strict';

import {Get, JsonController, Body, Authorized} from "routing-controllers";
import {Inject} from "typedi";
import {Success} from "../../core/responseable/Result";
import {default as TestService} from "../../services/TestService";

@JsonController('test')
class TestController {

    @Inject('testService')
    testService: TestService;

    @Authorized('hoangnh')
    @Get("/users/:iid")
    getAll() {
        return Success.setMessage(this.testService.getContext());
    }
}
