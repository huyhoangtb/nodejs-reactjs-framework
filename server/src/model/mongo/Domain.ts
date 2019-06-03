import * as mongoose from 'mongoose';
import IDomain from "../interfaces/mongo/IDomain";
import MongoDB from "../../core/connections/mongodb";
import Entity from "../../core/entities/schemas/Entity";


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
    saasDomains: {
        type: [mongoose.Schema.Types.String],
        index: true
    },
    domains: {
        type: [mongoose.Schema.Types.String],
        index: true
    },
    themeCode: {
        type: mongoose.Schema.Types.String,
    },
    status: {
        type: mongoose.Schema.Types.String
    },
    orgIid: mongoose.Schema.Types.Number,
    orgRootIid: mongoose.Schema.Types.Number,
});

_schema.pre('save', function (next) {
    if (!this.createdDate) {
        this.createdDate = new Date();
    }
    this.updatedDate = new Date();
    next();
})
const autoIncrement = MongoDB.getAutoIncrement() || {plugin: Object};
_schema.plugin(autoIncrement.plugin, {model: 'domain', field: 'iid', startAt: 1});
/**
 * Mongoose.Model
 * @type {Model<IUser>}
 * @private
 */
export default mongoose.model<IDomain>('domain', _schema, 'domain', true);


