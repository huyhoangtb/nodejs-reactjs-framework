import RedisConfigs from "./RedisConfigs";
import {RedisClient} from "redis";

const {promisify} = require('util');

var redis = require('redis');

export default class Redis {
    public static CONNECTION: RedisClient;

    public static async initConnection() {

        const redisClient = await redis.createClient({host: RedisConfigs.HOST, port: RedisConfigs.PORT});
        redisClient.on('ready', function () {
            console.log("Redis is ready");
        });

        redisClient.on('error', function () {
            console.log("Error in Redis");
        });
        Redis.CONNECTION = redisClient;
    }

    public static async getRedisClient(): Promise<RedisClient> {
        if (!Redis.CONNECTION) {
            await Redis.initConnection();
        }
        return Redis.CONNECTION;
    }


    public static get = async (key: string) => {
        const connection = await Redis.getRedisClient();
        return await promisify(connection.get).bind(connection)(key);
    }

}
