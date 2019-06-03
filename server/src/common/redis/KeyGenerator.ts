export default class KeyGenerator {
    public static getKeyFromObject(obj: any = {}) {
        const objectKey = Object.keys(obj);
        if (objectKey.length === 0) {
            return null;
        }

        objectKey.sort();
        let redisKey = '';
        objectKey.map(key => {
            redisKey += `${key}:${obj[key]}::`;
        });
        redisKey.substr(0, redisKey.length - 2);
        return redisKey;
    }

    public static generateTokenKey(userIid: number, token: string) {
        return `${userIid}::${token}`;
    }
}