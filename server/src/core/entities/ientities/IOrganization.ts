import * as mongoose from 'mongoose';
import IEntity from "./base/IEntity";

export default interface IOrganization extends IEntity {
    ownerIid: number;
    orgIid: number;
    isRoot: number;
    path: string;
}
