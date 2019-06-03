import {Service} from "typedi";
import * as mongoose from "mongoose";
import {Types} from "mongoose";
import ObjectId = Types.ObjectId;
import Utils from "../../../repositories/Utils";
import Status from "../../../configs/Status";
import DuplicateChecking from "../../../model/Configs";
import {hashPassword} from "../../utils/password";

@Service("nodeRepository")
export default class NodeRepository {

    /**
     * This function will check the data by input value.
     *
     * @param collection: user
     * @param fields: 'email|code|phone'
     * @param value 'vntopmas@gmail.com'
     */
    async nodeIsExisted(collection: string, fields: string, value: any) {

        let searchInput = NodeRepository.filterFieldsAndSetDefaultValue(collection, fields, value);
        if (!searchInput || Object.keys(searchInput).length === 0) {
            return false;
        }
        const query = await mongoose.model(collection).findOne().or(searchInput).lean();
        if (Object.keys(query).length === 0) {
            return false;
        }
        return true;
    }

    /**
     * This function will help to update the document.
     * we need id or iid to update
     *
     * @param collection
     * @param data
     */
    async update(collection: string, data: any = {}) {

        let document = NodeRepository.filterParamsFields(collection, {...data});
        console.log('documentdocumentdocumentdocumentdocument', document);
        if (Object.keys(document).length === 0) {
            return null;
        }

        await DuplicateChecking.checkDuplicate(this, collection, document);
        let updateConditions = null;
        if (document.iid) { // update by iid
            updateConditions = {iid: document.iid};
            if (document.password) {
                document.password = await hashPassword(document.password);
            }
            return await mongoose.model(collection).updateOne(updateConditions, document);
        }
        // TODO: Support update by id
        return null;
    }

    /**
     * This function will support for create a document of collection
     *
     * @param collection
     * @param data
     */
    async create(collection: string, data: any = {}) {
        if (data.status === undefined) {
            data.status === Status.ACTIVE;
        }
        let document = NodeRepository.filterParamsFields(collection, {...data});
        if (Object.keys(document).length === 0) {
            return null;
        }
        await DuplicateChecking.checkDuplicate(this, collection, document);
        document._id = new ObjectId();
        return await mongoose.model(collection).create(document);
    }

    /**
     * return the document list
     *
     * @param collection
     * @param params
     */
    async find(collection: string, params: any = {}, attachedNodesString?: string) {
        let searchInputObject = NodeRepository.filterParamsFields(collection, {...params});
        const pageSize = params.pageSize ? parseInt(params.pageSize) : 10;
        const currentPage = params.currentPage ? parseInt(params.currentPage) : 1;
        const sortField = params.sortField ? params.sortField : 'createdDate';
        const sortOrder = params.sortOrder && params.sortOrder === 'ascend' ? 1 : -1;
        const query = mongoose.model(collection).find(searchInputObject);
        const anySearch = NodeRepository.getAnySearchConditions(params);
        if (anySearch && anySearch.length > 0) {
            query.or(anySearch);
        }
        query.limit(pageSize)
            .skip(pageSize * (currentPage - 1))
            .sort({[sortField]: sortOrder});

        let result = await query.lean().exec();
        return {
            documents: await Utils.doAttachDataToDocuments(result, attachedNodesString),
            pagination: {
                pageSize: pageSize,
                currentPage: currentPage,
                skip: pageSize * (currentPage - 1),
                short: {[sortField]: sortOrder},
                total: await this.countData(collection, searchInputObject, anySearch)
            }
        };
    }

    async findAll(collection: string, params: any = {}, attachedNodesString?: string) {
        let searchInputObject = NodeRepository.filterParamsFields(collection, {...params});

        const query = mongoose.model(collection).find(searchInputObject);
        const anySearch = NodeRepository.getAnySearchConditions(params);
        if (anySearch && anySearch.length > 0) {
            query.or(anySearch);
        }

        let data = await query.lean().exec();
        return await Utils.doAttachDataToDocuments(data, attachedNodesString);
    }

    async findAllByIids(collection: string, params: any = {}, attachedNodesString?: string) {

        let iids = params.iids;
        if(!iids) {
            return []
        }

        let searchInputObject = NodeRepository.filterParamsFields(collection, {...params});
        searchInputObject = {...searchInputObject, iid: {$in: iids}};
        const query = mongoose.model(collection).find(searchInputObject);
        const anySearch = NodeRepository.getAnySearchConditions(params);
        if (anySearch && anySearch.length > 0) {
            query.or(anySearch);
        }

        let data = await query.lean().exec();
        return await Utils.doAttachDataToDocuments(data, attachedNodesString);
    }

    async countData(collection: string, params: any = {}, anySearch: any = []) {
        const query = mongoose.model(collection).find(params);
        if (anySearch && anySearch.length > 0) {
            query.or(anySearch);
        }
        return await query && query.count();
    }

    /**
     * This function will auto search the detail of the document
     *
     * @param collection
     * @param params
     */
    async getCollectionDetail(collection: string, params: any = {}, attachedNodesString?: string) {

        let searchInputObject = NodeRepository.filterParamsFields(collection, params);
        if (Object.keys(params).length === 0) {
            return null;
        }

        const document: any = await mongoose.model(collection).findOne(searchInputObject).lean();
        if (document) {
            delete document.password;
        }
        return await Utils.doAttachDataToDocument(document, attachedNodesString);
    }

    /**
     * This function will use to get all the fields config in schema
     *
     * @param collection
     */
    public static getSchemaConfigsFields(collection: string): any[] {
        const schema: any = mongoose.model(collection).schema;
        const tree = schema.tree;
        return Object.keys(tree);
    }

    private static getAnySearchConditions(params: any = {}) {
        const searchInputs = {...params};
        const anySearchParam = searchInputs['_q'] || searchInputs['q'] || searchInputs['searchData'] || searchInputs['searchInput'];
        if (!anySearchParam) {
            return [];
        }
        return [
            {name: NodeRepository.createRegex(anySearchParam)},
            {code: NodeRepository.createRegex(anySearchParam)},
            {username: NodeRepository.createRegex(anySearchParam)},
            {code: NodeRepository.createRegex(anySearchParam)},
            {email: NodeRepository.createRegex(anySearchParam)},
            {phone: NodeRepository.createRegex(anySearchParam)},
        ];
    }

    private static createRegex(userInput: string) {
        // return new RegExp(userInput, "i");
        return new RegExp(
            // Escape all special characters except * /"^" +
            userInput.replace(/([.+?^=!:${}()|\[\]\/\\])/g, "\\$1")
            // Allow the use of * as a wildcard like % in SQL.
                .replace(/\*/g, ".*"),// + "$",
            'i'
        );
    }

    /**
     * This function will remove all the params that dont exists in the config field of Model
     *
     * @param collection
     * @param params
     */
    private static filterParamsFields(collection: string, params: any = {}) {
        const result: any = {};
        const fields = NodeRepository.getSchemaConfigsFields(collection);
        if (!fields || fields.length === 0) {
            return {}
        }

        fields.map(field => {
            if (params[field] !== undefined && field !== 'id') {
                result[field] = params[field];
            }
            if (field === 'id' && params.id) {
                result._id = params.id;
            }
        });
        return result;
    }

    /**
     *
     * @param collection
     * @param fieldsInput
     * @param defaultValue
     */
    private static filterFieldsAndSetDefaultValue(collection: string, fieldsInput: string, defaultValue: any) {

        let fields: any[] = [];
        const result: any = {};

        const checkingFields = fieldsInput.split('|');
        fields = NodeRepository.getSchemaConfigsFields(collection);

        if (!fields || fields.length === 0) {
            return {}
        }

        checkingFields.map(field => {
            let f = field.trim();
            if (fields.indexOf(f) !== -1) {
                result[f] = defaultValue;
            }
        });

        return result;
    }

}