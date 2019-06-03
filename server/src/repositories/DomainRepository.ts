import Status from "../configs/Status";
import {Service} from "typedi";
import Repository from "../core/repositories/Repository";
import IDomain from "../model/interfaces/mongo/IDomain";
import Domain from "../model/mongo/Domain";

@Service("domainRepository")
export default class DomainRepository extends Repository<IDomain> {

    constructor() {
        super(Domain);
    }

    /**
     *
     * @param {IDomain} domain
     * @returns {Promise<"mongoose".Document>}
     */
    public async createDomain(domain: IDomain) {
        domain.status = Status.ACTIVE;
        return await this.create(domain);
    }

}

Object.seal(DomainRepository);
