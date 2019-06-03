import {Document} from "mongoose";

export interface IRead<T> {
    findAll: () => Promise<Document[]>;
    findById: (id: String) => Promise<T>;
    findByIid: (id: number) => Promise<T>;
    findOne(cond?: Object): Promise<T>;
    find(cond: Object, options: Object): Promise<Document[]>;
    search(cond?: object, pageSize?: number, currentPage?: number, sortField?: string, sortOrder?: string): Promise<Document[]>;
    countData(cond?: object): Promise<number>;
}
