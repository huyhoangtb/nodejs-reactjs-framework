import * as mongoose from 'mongoose';
import IAccount from "../../core/entities/ientities/IAccount";
import Translate from "../../core/i18n";
import MongoDB from "../../core/connections/mongodb";
import IJobPosition from "../../core/entities/ientities/IJobPosition";
import Entity from "../../core/entities/schemas/Entity";

const schemma = {
    ...Entity,
    roles: {
        type: [mongoose.Schema.Types.String]
    },
}

/**
 * MongooseSchema
 * @type {"mongoose".Schema}
 * @private
 */
var _schema: mongoose.Schema = new mongoose.Schema(schemma);

const autoIncrement = MongoDB.getAutoIncrement() || {plugin: Object};
_schema.plugin(autoIncrement.plugin, {model: 'job_position', field: 'iid', startAt: 1});

/**
 * Mongoose.Model
 * @type {Model<IAccount>}
 * @private
 */
export default mongoose.model<IJobPosition>('job_position', _schema, 'job_position', true);


