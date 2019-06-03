import {Schema} from "mongoose";
var httpContext = require('express-http-context');

module.exports = function echoPlugin(schema: Schema, options: any) {
    // schema.pre('create', function (next) {
    //     this.createdDate = new Date();
    //     // if(user) {
    //     //     this.createUserId = user.iid;
    //     //     this.rootIid = user.rootIid;
    //     //     this.orgIid = user.orgIid;
    //     // }
    //     next();
    // });

    // schema.pre('init', async function (next, req, callback) {
    //
    //     this.updatedDate = new Date();
    //     var httpContext = require('express-http-context');
    //     await httpContext.set('user1231', 'hoangnh');
    //     // if(user) {
    //     //     this.updatedUserId = user.iid;
    //     // }
    //     // next();
    // });

    // schema.pre('find', function (next) {
    //     this.updatedDate = new Date();
    //     var httpContext = require('express-http-context');
    //     httpContext.get('user');
    //     console.log('find', httpContext.get('user'));
    //     // if(user) {
    //     //     this.updatedUserId = user.iid;
    //     // }
    //     next();
    // });

}
