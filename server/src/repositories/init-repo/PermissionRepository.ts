import {Service} from "typedi";
import Repository from "../../core/repositories/Repository";
import IPermission from "../../core/entities/ientities/IPermission";
import Permission from "../../model/mongo/Permission";
import Role from "../../model/mongo/Role";

@Service("permissionRepository")
export default class PermissionRepository extends Repository<IPermission> {

    constructor() {
        super(Permission);
        const r = new Permission();
    }

}

Object.seal(PermissionRepository);
