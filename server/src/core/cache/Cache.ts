import RedisClient from "../connections/redis/redis";

export default class Cache {
    public static cache(document: any) {
        RedisClient.initConnection().set('rrrrrrrrrrrrrrrrr', document);
    }
}
