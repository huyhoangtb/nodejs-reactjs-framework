import * as session from 'express-session';
import {Store} from 'express-session';
import * as ConnectRedis from 'connect-redis';

const RedisConfigs = require("../common/configs/redis");


export default class SessionManager {
    public static sessionCookieKey: string = 'userSessions';

    constructor(protected app: any, protected io: any) {
        this.app = app;
        this.io = io;
    }

    tracking(): void {

        this.app.use(session({
            secret: 'ssshhhhh',
            store: SessionManager.getRedisStore(),
            saveUninitialized: false,
            resave: false
        }));

    }

    public static getRedisStore(): Store {
        const RedisStore = ConnectRedis(session);
        return new RedisStore({host: RedisConfigs.HOST, port: RedisConfigs.PORT, ttl: 260});
    }

}
