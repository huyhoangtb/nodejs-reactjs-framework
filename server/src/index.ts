import "reflect-metadata";
import './common';
import * as express from 'express';
import {useExpressServer, useContainer, Action} from "routing-controllers";
import ApplicationSecurity from "./core/application/ApplicationSecurity";
import MongoDB from "./core/connections/mongodb";
import "./controllers/socket/TestController"; // we need to "load" our controller before call createSocketServer. this is required
import "es6-shim"; // this shim is optional if you are using old version of node
import "reflect-metadata"; // this shim is required
import {createSocketServer} from "socket-controllers";
import {Container} from "typedi";
import * as bodyParser from "body-parser";
import Redis from "./core/connections/redis/redis";
import {ContextInjectionMiddleware} from "./core/middleware/web/ContextInjectionMiddleware";
import InitModel from "./model/InitModel";
import {DefaultExceptionTrigger} from "./core/middleware/web/DefaultExceptionTrigger";
import ConfigsReader from "./configs/ConfigsReader";
var httpContext = require('express-http-context');

declare let __dirname: string;

let app = express();
app.use(httpContext.middleware);

const router = express.Router();

MongoDB.makeConnection();
Redis.initConnection().then(()=>{});
InitModel.init();
useContainer(Container);

const appSecurity = new ApplicationSecurity();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//support for local static cdn
app.use(express.static(ConfigsReader.readConfig().cdnRootDir))

useExpressServer(app, {
    routePrefix: "/api/v1",
    cors: true,
    defaultErrorHandler: false,
    // defaultErrorHandler: false,
    controllers: [
        __dirname + "/controllers/web-api/*/*.ts",
        __dirname + "/controllers/web-api/*.ts",
        __dirname + "/core/controllers/web-api/*.ts"
    ],
    // middlewares: [__dirname + "/core/middleware/web"],
    middlewares: [DefaultExceptionTrigger, ContextInjectionMiddleware],
    authorizationChecker: appSecurity.authorizationChecker,
    classTransformer: false,
});

createSocketServer(3002, {
    controllers: [__dirname + "/controllers/socket/*.ts"]
}); // registers all given controllers

app.listen(3001, function () {
    console.log(`listening on *: port 3001`);
}); // register controllers routes in our express application
