import * as mongoose from 'mongoose';
import IOrganization from "../interfaces/mongo/IOrganization";
import Entity from "../../core/entities/schemas/Entity";
import MongoDB from "../../core/connections/mongodb/index";


const defineSchema = {
    id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        get: (v: any) => v.toString()
    },
    ...Entity,
    shortName: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    parentIid: {
        type: Number
    },
    address: {
        type: String
    },
    logo_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    isRoot: {
        type: mongoose.Schema.Types.Number,
        default: 0
    },
    notes: {
        type: String
    },
    ownerIid: mongoose.Schema.Types.Number,
    orgIid: mongoose.Schema.Types.Number,
    path: mongoose.Schema.Types.String,
};


var _schema: mongoose.Schema = new mongoose.Schema({
    ...defineSchema
});
// _schema.pre('save', function (next) {
//     if(!this.createdDate) {
//         this.createdDate = new Date();
//     }
//     this.updatedDate = new Date();
//     next();
// })
const autoIncrement = MongoDB.getAutoIncrement() || {plugin: Object};
_schema.plugin(autoIncrement.plugin, {model: 'organization', field: 'iid', startAt: 1});

export default mongoose.model<IOrganization>('organization', _schema, 'organization', true);


