// import Oauth2ServerRepository from "../../repository/Oauth2ServerRepository";
import InitModel from "../../../model/InitModel";

var mongoose = require('mongoose');
var DateTimePlugin = require('../../plugins/moongoose/DateTimePlugin');
var autoIncrement = require('mongoose-auto-increment');
var initAutoIncrement = null;
var uri = 'mongodb://localhost:27017/platform';

mongoose.set('useFindAndModify', false);

const MongoDB = {

    makeConnection() {

        var db = mongoose.connection;

        db.on('connecting', function () {
            console.log('connecting to MongoDB...');
        });

        db.on('error', function (error: any) {
            console.error('Error in MongoDb connection: ' + error);
            mongoose.disconnect();
        });
        db.on('connected', async function () {
            console.log('MongoDB connected!');
        });
        db.once('open', function () {
            console.log('MongoDB connection opened!');
        });
        db.on('reconnected', function () {
            console.log('MongoDB reconnected!');
        });
        db.on('disconnected', function () {
            console.log('MongoDB disconnected!');
        });

        mongoose.connect(uri, {autoReconnect: true, useNewUrlParser: true,useCreateIndex: true});
        mongoose.plugin(DateTimePlugin);
    },

    getAutoIncrement(){
        autoIncrement.initialize(mongoose.connection);
        return autoIncrement;
    }

}
// https://github.com/boblauer/cachegoose/blob/master/src/extend-query.js
// const exec = mongoose.Query.prototype.exec;
// mongoose.Query.prototype.exec = function(op: any = {}, callback = function() { }) {
//     console.log('aaaaaaaaaaaaaaaaaaaa mongoose.Query.prototype.exec', this);
//     const model = this.model.modelName;
//
//     return new Promise((resolve, reject) => {
//         exec
//             .call(this)
//             .then((results: any) => {
//                 const constructor = mongoose.model(model);
//                 console.log();
//                 resolve(results);
//             })
//             .catch((err: any) => {
//                 reject(err);
//             });
//     });
//
// }
//
// function hydrateModel(constructor: any) {
//     return (data: any) => {
//         return constructor.hydrate(data);
//     };
// }
export default MongoDB;
