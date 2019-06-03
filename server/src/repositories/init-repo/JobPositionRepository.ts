import {Service} from "typedi";
import Repository from "../../core/repositories/Repository";
import IJobPosition from "../../core/entities/ientities/IJobPosition";
import JobPosition from "../../model/mongo/JobPosition";

@Service("jobPositionRepository")
export default class JobPositionRepository extends Repository<IJobPosition> {

    constructor() {
        super(JobPosition);
        const r = new JobPosition();
    }

}

Object.seal(JobPositionRepository);
