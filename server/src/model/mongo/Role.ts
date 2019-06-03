import * as mongoose from 'mongoose';
import IAccount from "../../core/entities/ientities/IAccount";
import {SchemaCodeWithRoleAndPermission} from '../../core/entities/schemas/Schema';
import Translate from "../../core/i18n";
import MongoDB from "../../core/connections/mongodb";
import Entity from "../../core/entities/schemas/Entity";
import IRole from "../../core/entities/ientities/IRole";

const defineSchema = {
    ...Entity,
    permissions: {
        type: [mongoose.Schema.Types.String],
        require: true,
    },
    code: {
        unique: true,
        type: mongoose.Schema.Types.String,
    }
};

/**
 * MongooseSchema
 * @type {"mongoose".Schema}
 * @private
 */
var _schema: mongoose.Schema = new mongoose.Schema(defineSchema);

const autoIncrement = MongoDB.getAutoIncrement() || {plugin: Object};
_schema.plugin(autoIncrement.plugin, {model: 'role', field: 'iid', startAt: 1});

/**
 * Mongoose.Model
 * @type {Model<IAccount>}
 * @private
 */
export default mongoose.model<IRole>('role', _schema, 'role', true);


