import {Service} from "typedi";
import Repository from "../../core/repositories/Repository";
import IRole from "../../core/entities/ientities/IRole";
import Role from "../../model/mongo/Role";

@Service("roleRepository")
export default class RoleRepository extends Repository<IRole> {

    constructor() {
        super(Role);
        const r = new Role();
    }

}

Object.seal(RoleRepository);
