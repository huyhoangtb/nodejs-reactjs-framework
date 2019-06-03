import NodeRepository from "../core/repositories/node/NodeRepository";
import Exception from "../core/exceptions/Exception";

/**
 * default check permission on type of
 */
const permissions = {
    READ: true,
    CREATE: true,
    UPDATE: true,
    FIND: true,
};

const stringTypeFields = ['code', 'name', 'email', 'username', 'shortName'];

export const ModelConfigs: any = {
    role: {
        permissions,
        uniqueOn: 'code'
    },
    permission: {
        permissions,
        notRequiredRootIid: true,
        uniqueOn: 'code'
    },
    user: {
        permissions,
        uniqueOn: ['code', 'email', 'username']
    },
    organization: {
        permissions,
        uniqueOn: ['name', 'code', 'shortName']
    }
}

export default class DuplicateChecking {
    /**
     *
     * @param collection
     */
    static async checkDuplicate(nodeReposistory: NodeRepository, collection: string, document: any) {
        const uniqueOn: any = ModelConfigs[collection] && ModelConfigs[collection].uniqueOn;

        if (!uniqueOn || uniqueOn.length === 0) {
            return false; // dont config unique is no need to be check duplicate
        }
        if (typeof uniqueOn === 'string') {
            const field = uniqueOn;
            await DuplicateChecking.isDuplicatedOnField(nodeReposistory, collection, field, document[field], document.iid);
            return;
        } else {
            if (Array.isArray(uniqueOn)) {
                const duplicateFields = [...uniqueOn];
                for (let i = 0; i < duplicateFields.length; i++) {
                    const field = duplicateFields[i];
                    if (Array.isArray(duplicateFields[i])) { // check with list of field
                        await DuplicateChecking.isDuplicatedOnFields(nodeReposistory, collection, document, field);
                    } else if(document[field]){ // check with config is string field
                        await DuplicateChecking.isDuplicatedOnField(nodeReposistory, collection, field, document[field], document.iid);
                    }
                }
            }
        }
    }

    /**
     * check key duplicate 'code'
     *
     * @param nodeReposistory
     * @param collection
     * @param field
     * @param value
     */
    static async isDuplicatedOnField(nodeReposistory: NodeRepository, collection: string, field: any, value: any, iid: number) {

        const conditions: any = {[field]: stringTypeFields.indexOf('field') !== -1 ? value :  { $regex : new RegExp(value, "i")}};
        if (iid) {
            conditions['iid'] = {$ne: iid};
        }

        const node = await nodeReposistory.getCollectionDetail(collection, conditions);
        if (!node || Object.keys(node).length === 0) {
            return;
        }
        throw new Exception(`${field}: ${value} is duplicated`);
    }


    /**
     *
     * check key duplicate ['iid', 'code', 'email', 'username']
     *
     * @param nodeReposistory
     * @param collection
     * @param document
     * @param fields
     */
    static async isDuplicatedOnFields(nodeReposistory: NodeRepository, collection: string, document: any, fields: any[]) {

        const conditions: any = {};
        fields.map((field: any) => {
            conditions[field] = document[field] ? document[field] : null;
        });
        if (document.iid) {
            conditions['iid'] = {$ne: document.iid};
        }
        const node = await nodeReposistory.getCollectionDetail(collection, conditions);
        if (!node || Object.keys(node).length === 0) {
            return;
        }
        throw new Exception(`${document.name || document.code}: is duplicated ${conditions.toString && conditions.toString()} is duplicated`);
    }
}