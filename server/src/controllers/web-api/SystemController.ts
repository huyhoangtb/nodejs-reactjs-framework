'use strict';

import Status from "../../configs/Status";
import {Controller, Get, JsonController} from "routing-controllers";
import {Success} from "../../core/responseable/Result";
import System from "../../configs/System";
import LectureMaterials from "../../configs/LectureMaterials";

@Controller('/system')
export default class SystemController {

    @Get("/context")
    getContext() {
        const result = {
            statuses: Status.DEFAULT,
            SAAS_DOMAIN: System.SAAS_DOMAIN,
            lectureMaterialTypes: LectureMaterials.types,
            hostedTypes: LectureMaterials.hostedTypes,
        }
        return Success.setSuccess().setResult(result);
    }

}
