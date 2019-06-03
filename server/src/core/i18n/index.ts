import {vsprintf} from "sprintf-js";

export default class Translate {
    static use(key: string, ...args: any[]) {
        return vsprintf(key, args);
    }
}
