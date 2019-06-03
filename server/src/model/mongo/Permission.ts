import * as mongoose from 'mongoose';
import IAccount from "../../core/entities/ientities/IAccount";
import MongoDB from "../../core/connections/mongodb";
import Entity from "../../core/entities/schemas/Entity";
import IPermission from "../../core/entities/ientities/IPermission";

const defineSchema = { ...Entity };
/**
 * MongooseSchema
 * @type {"mongoose".Schema}
 * @private
 */
var _schema: mongoose.Schema = new mongoose.Schema(defineSchema);

const autoIncrement = MongoDB.getAutoIncrement() || {plugin: Object};
_schema.plugin(autoIncrement.plugin, {model: 'permission', field: 'iid', startAt: 1});

/**
 * Mongoose.Model
 * @type {Model<IAccount>}
 * @private
 */
export default mongoose.model<IPermission>('permission', _schema, 'permission', true);


