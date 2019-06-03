'use strict';

import Status from "../../configs/Status";
import {Get, JsonController} from "routing-controllers";
import {Success} from "../../core/responseable/Result";
import LectureMaterials from "../../configs/LectureMaterials";

@JsonController('/context')
class AppController {

    @Get("/app")
    getContext() {
        const result = {
            lectureTypes: LectureMaterials.types
        }
        return Success.setSuccess().setResult(result);
    }

}
