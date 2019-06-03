import * as mongoose from 'mongoose';
import MongoDB from "../../core/connections/mongodb";
import UserSchema from "../../core/entities/schemas/User";
import IUser from "../../core/entities/ientities/IUser";

const autoIncrement = MongoDB.getAutoIncrement() || {plugin: Object};
var _schema: mongoose.Schema = new mongoose.Schema(UserSchema);
_schema.plugin(autoIncrement.plugin, {model: 'user', field: 'iid', startAt: 1});

/**
 * Mongoose.Model
 * @type {Model<IUser>}
 * @private
 */
export default mongoose.model<IUser>('user', _schema, 'user', true);


