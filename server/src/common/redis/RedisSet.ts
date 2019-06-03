import KeyGenerator from "./KeyGenerator";
import Redis from "../../core/connections/redis/redis";

const SET_OPTION_TYPES = {
    EX: 'EX',// seconds -- Set the specified expire time, in seconds.
    PX: 'PX',//     milliseconds -- Set the specified expire time, in milliseconds.
    NX: 'NX', //    -- Only set the key if it does not already exist.
    XX: 'XX'//     -- Only set the key if it already exist.
}

// const DEFAULT_TIME_IN = 86400000; // 24*60*60*1000 total seconds
const DEFAULT_TIME_IN = 10; // 24*60*60 total seconds

export default class RedisSet {
    static async cacheObject(object: object = {}, timeInput?: number, typeInput?: string) {
        const key = KeyGenerator.getKeyFromObject(object);
        if (key === null) {
            return null;
        }
        const {time, type} = RedisSet.getDefaultParams(timeInput, typeInput);
        const connection = await Redis.getRedisClient();
        await connection.set(key, JSON.stringify(object), type, time);
    }

    static async set(key: string, object: object = {}, timeInput?: number): Promise<any> {
        const {time} = RedisSet.getDefaultParams(timeInput);
        const connection = await Redis.getRedisClient();
        await connection.setex(key, time, JSON.stringify(object));
    }
    static async get(key: string): Promise<any> {
        const connection = await Redis.getRedisClient();
        return await connection.get(key);
    }
   static async getCachedObject(object: object = {}, time?: number, type?: string): Promise<any> {
        const key = KeyGenerator.getKeyFromObject(object);
        if (key === null) {
            return null;
        }
        const dataCached = await Redis.get(key);
        if (!dataCached) {
            return null;
        }
        return JSON.parse(dataCached);

    }

    static getDefaultParams(time?: number, type?: string) {
        if (!time) {
            time = DEFAULT_TIME_IN;
        }
        if (!type) {
            type = SET_OPTION_TYPES.PX
        }
        return {time, type}
    }
}