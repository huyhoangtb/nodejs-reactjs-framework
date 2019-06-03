import {Service} from "typedi";
import Organization from "../../model/mongo/Organization";
import Repository from "../../core/repositories/Repository";
import IOrganization from "../../model/interfaces/mongo/IOrganization";

@Service("organizationRepository")
export default class OrganizationRepository extends Repository<IOrganization> {

    constructor() {
        super(Organization);
    }

    public async createOrg(org: any) {
        return await org.save();
    }
}
