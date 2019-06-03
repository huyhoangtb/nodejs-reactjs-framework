import {Document, Schema} from 'mongoose';
import * as mongoose from "mongoose";

export default interface IEntity extends Document  {
    _id: {
        type: Schema.Types.ObjectId,
        require: true
    };
    id: {
        type: Schema.Types.ObjectId,
        require: true
    };
    iid: number;
    name: string,
    code: string,
    status: number,
    createdDate: Date;
    updatedDate: Date;
    createUserId: number;
    createOrgId: number;
    updatedOrgId: number;
    orgIid: number,
    orgRootIid: number,
    orgIids: number[],

}
