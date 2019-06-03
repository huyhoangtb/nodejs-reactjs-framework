import * as mongoose from 'mongoose';
import IDomain from "../interfaces/mongo/IDomain";
import MongoDB from "../../core/connections/mongodb";
import Entity from "../../core/entities/schemas/Entity";
import IFile from "../interfaces/mongo/IFile";


/**
 * MongooseSchema
 * @type {"mongoose".Schema}
 * @private
 */
var _schema: mongoose.Schema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    iid: {
        type: mongoose.Schema.Types.Number,
        index: true,
        unique: true
    },
    ...Entity,

    originalName: {
        type: mongoose.Schema.Types.String,
    },
    encoding: {
        type: mongoose.Schema.Types.String,
    },
    mimetype: {
        type: mongoose.Schema.Types.String,
    },
    size: {
        type: mongoose.Schema.Types.Number,
    },
    folder: {
        type: mongoose.Schema.Types.String,
    },
    localFileName: {
        type: mongoose.Schema.Types.String,
    },

    ext: {
        type: mongoose.Schema.Types.String
    },
    status: {
        type: mongoose.Schema.Types.String
    },
    orgIid: mongoose.Schema.Types.Number,
    orgRootIid: mongoose.Schema.Types.Number,
    path: {
        type: mongoose.Schema.Types.String
    }
});

_schema.pre('save', function (next) {
    if (!this.createdDate) {
        this.createdDate = new Date();
    }
    this.updatedDate = new Date();
    next();
})
const autoIncrement = MongoDB.getAutoIncrement() || {plugin: Object};
_schema.plugin(autoIncrement.plugin, {model: 'file', field: 'iid', startAt: 1});
/**
 * Mongoose.Model
 * @type {Model<IUser>}
 * @private
 */
export default mongoose.model<IFile>('file', _schema, 'file', true);


