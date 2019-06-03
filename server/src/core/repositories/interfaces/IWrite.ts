import {Document, Types} from 'mongoose';

export interface IWrite<T extends Document> {
    create: (item: T) => Promise<Document>;
    updateById: (_id: Types.ObjectId, item: T) => Promise<T>;
    deleteById: (_id: string) => Promise<void>;

    updateByIid: (iid: number, item: any) => Promise<T>;
    deleteByIid: (iid: number) => Promise<void>;
}
