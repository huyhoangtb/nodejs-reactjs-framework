import {IRead} from "./interfaces/IRead";
import {IWrite} from "./interfaces/IWrite";
import {Document, Model, Types} from 'mongoose';
import {ObjectId} from "bson";
import {ArrayCondition} from "../../common/conditions/ArrayCondition";
import * as mongoose from "mongoose";

export default class Repository<T extends Document> implements IRead<T>, IWrite<T> {
    protected _model: Model<T>;

    constructor(schemaModel: Model<T>) {
        this._model = schemaModel;
    }

    /**
     * new a document by Iid
     *
     * @param {T} item
     * @returns {Promise<"mongoose".Document>}
     */
    async create(item: T): Promise<T> {
        if (!item._id) {
            item._id = new ObjectId();
        }

        return await this._model.create(item);
    }

    /**
     * delete a document by id
     *
     * @param {string} _id
     * @returns {Promise<void>}
     */
    deleteById(_id: string): Promise<void> {
        const condition = {_id: this.toObjectId(_id)};
        const query = this._model.remove(condition);
        return query.exec();
    }

    /**
     * update a document by id
     *
     * @param {"mongoose".Types.ObjectId} _id
     * @param {T} item
     * @returns {Promise<T extends "mongoose".Document>}
     */
    async updateById(_id: Types.ObjectId, item: T): Promise<T> {
        return await this._model.update({_id: _id}, item);
    }

    /**
     * delete a document by Iid
     *
     * @param {number} iid
     * @returns {Promise<void>}
     */
    deleteByIid(iid: number): Promise<void> {
        const query = this._model.remove({iid});
        return query.exec();
    }

    /**
     * update document by Iid
     *
     * @param {number} iid
     * @param {T} item
     * @returns {Promise<T extends "mongoose".Document>}
     */
    async updateByIid(iid: number, item: any): Promise<T> {
        return await this._model.update({iid}, item);
    }

    /**
     * find all documents
     *
     * @returns {Promise<"mongoose".Document[]>}
     */
    async findAll(): Promise<T[]> {
        const r = this._model.find({});
        return await r.exec();

    }

    /**
     * find all documents
     *
     * @returns {Promise<"mongoose".Document[]>}
     */
    async findAllRawData(): Promise<object> {
        return await this._model.find({}).lean();

    }

    /**
     * find a document by id
     *
     * @param {String} _id
     * @returns {Promise<any>}
     */
    async findById(_id: String): Promise<any> {
        const r = this._model.findById(_id);
        return await r.exec();
    };

    /**
     * find a document by iid
     *
     * @param {number} iid
     * @returns {Promise<any>}
     */
    async findByIid(iid: number): Promise<any> {
        return await this._model.findOne({iid}).lean();
    };

    /**
     * find a document by conditions
     *
     * @param {Object} cond
     * @returns {Promise<any>}
     */
    async findOne(cond?: Object): Promise<any> {
        const r = this._model.findOne(cond);
        return await r.exec();
    };

    /**
     * find documents by conditions
     *
     * @param {Object} cond
     * @returns {Promise<"mongoose".Document[]>}
     */
    async search(cond?: object, pageSize?: number, currentPage?: number, sortField?: string, sortOrder?: any): Promise<any> {

        pageSize = pageSize ? pageSize : 10;
        currentPage = currentPage ? currentPage : 1;
        sortField = sortField ? sortField : 'createdDate';
        sortOrder = (sortOrder && sortOrder === 'ascend') ? 1 : -1;

        const _q = this.getSearchInputConditions(cond);
        const conditions = this.filterParamsByFields(cond);

        const query = this._model.find(conditions);
        if (_q) query.or(_q);

        query.limit(pageSize)
            .skip(pageSize * (currentPage - 1))
            .sort({[sortField]: sortOrder});

        return {
            documents: await query.lean(),
            pagination: {
                pageSize: pageSize,
                currentPage: currentPage,
                total: await this.countData(cond)
            }
        };
    };

    /**
     * find documents by conditions
     *
     * @param {Object} cond
     * @returns {Promise<"mongoose".Document[]>}
     */
    async find(cond?: Object): Promise<Document[]> {
        const r = this._model.find(cond);
        return await r.exec();
    };

    async countData(cond?: object): Promise<number> {
        const query = this._model.find(cond);
        return await query && query.count();
    }

    toObjectId(_id: string): Types.ObjectId {
        return Types.ObjectId.createFromHexString(_id);
    }

    /**
     * This function will use to find all the documents that match with the input fields
     * await this.findAllDocumentsWithAnyKeys(user, 'username', 'email', 'code', 'iid')
     *
     * @param user
     * @param args
     */
    async findAllDocumentsWithAnyKeys(document: any, ...args: string[]) {
        if (!args || args.length === 0) {
            return null;
        }
        const arrayCondition = new ArrayCondition();
        args.map(field => {
            arrayCondition.addByObject(document, field);
        });
        const condition = arrayCondition.toArray();
        if (condition.length === 0) {
            return null;
        }
        if (condition.length === 1) {
            return await this._model.find(condition);
        }
        return await this._model.find().or(condition);

    }

    /**
     * This function will use to find all the documents that match with the input fields
     * await this.findAllDocumentsWithAnyKeys(user, 'username', 'email', 'code', 'iid')
     *
     * @param user
     * @param args
     */
    async findOneDocumentsWithAnyKeys(document: any, ...args: string[]) {

        if (!args || args.length === 0) {
            return null;
        }
        const arrayCondition = new ArrayCondition();
        args.map(field => {
            arrayCondition.addByObject(document, field);
        });
        const condition = arrayCondition.toArray();

        if (condition.length === 0) {
            return null;
        }
        if (condition.length === 1) {
            return await this._model.findOne(condition).lean();
        }
        return await this._model.findOne().or(condition).lean();

    }

    /**
     * This function will use to check if the document that existed with some input fields
     * await this.checkExistedDocumentWithAnyKeys(user, 'username', 'email', 'code', 'iid')
     *
     * @param document
     * @param args
     */
    async checkExistedDocumentWithAnyKeys(document: any, ...args: string[]) {
        if (!args || args.length === 0) {
            return false;
        }
        const arrayCondition = new ArrayCondition();
        const iid = document.iid;
        const id = document.id;
        const _id = document._id;

        delete document.iid;
        delete document._id;
        delete document.id;

        args.map(field => {
            arrayCondition.addByObject(document, field);
        });
        const condition = arrayCondition.toArray();
        if (condition.length === 0) {
            return false;
        }
        let query = null;
        if (condition.length === 1) {
            query = this._model.findOne(condition[0]);
        } else {
            query = this._model.findOne().or(condition);
        }
        if(iid) {
            query.ne('iid', iid)
        }
        if(id) {
            query.ne('_id', id)
        }
        if(_id) {
            query.ne('_id', _id)
        }
        return await query.lean().exec();

    }

    public getSearchInputConditions(params: any = {}) {
        const searchInputs = {...params};
        const anySearchParam = searchInputs['_q'] || searchInputs['q'] || searchInputs['searchData'] || searchInputs['searchInput'];
        if (!anySearchParam) {
            return;
        }

        return [
            {name: Repository.createRegex(anySearchParam)},
            {code: Repository.createRegex(anySearchParam)},
            {code: Repository.createRegex(anySearchParam)},
            {email: Repository.createRegex(anySearchParam)},
            {phone: Repository.createRegex(anySearchParam)},
        ];
    }

    /**
     * This function will remove all the params that dont exists in the config field of Model
     *
     * @param collection
     * @param params
     */
    private filterParamsByFields(params: any = {}) {
        const result: any = {};
        const fields = this.getModelFields();
        if (!fields || fields.length === 0) {
            return {}
        }

        fields.map(field => {
            if (params[field] !== undefined) {
                result[field] = params[field]
            }
        });

        return result;
    }

    /**
     * Check the org that action by user.
     * if can work on the org ==> return true;
     *
     * in this case, org is sub org of user orgs.
     * in most case, user and org need have same rootOrg
     *
     * @param userOrgIids
     * @param org
     */
    public static userCanWorkOnOrg(user: any, org: any) {
        const path = org.path || `_${org.iid}`;
        const userOrgIids = user.orgIids;


        if (user.rootIid !== org.rootIid) {
            return false;
        }

        if (!userOrgIids || userOrgIids.length === 0) {
            return false;
        }
        let orgIidsContainEmpty = path.split('_');
        let orgIids = orgIidsContainEmpty.filter((orgiid: string) => parseInt(orgiid));
        let result = false;
        userOrgIids.map((orgIid: number) => {
            if (orgIids.indexOf(`${orgIid}`) !== -1) {
                result = true;
            }
        });
        return result;
    }

    /**
     * This function will use to get all the fields config in schema
     *
     * @param collection
     */
    public getModelFields(): any[] {
        const schema: any = this._model.schema;
        const tree = schema.tree;
        return Object.keys(tree);
    }

    public static createRegex(userInput: string) {
        // return new RegExp(userInput, "i");
        return new RegExp(
            // Escape all special characters except * /"^" +
            userInput.replace(/([.+?^=!:${}()|\[\]\/\\])/g, "\\$1")
            // Allow the use of * as a wildcard like % in SQL.
                .replace(/\*/g, ".*"),// + "$",
            'i'
        );
    }

}
