import {verify} from "jsonwebtoken";

const prefix = `/api/v1`;

const ANONYMOUS_API = [
    `${prefix}/site/`,
];

export default class AnonymousApi {
    static Verify(url: string) {
        console.log(url);
        for (let i = 0; i < ANONYMOUS_API.length; i++) {
            const regex = new RegExp(ANONYMOUS_API[i], 'g');
            if (regex.test(url)) {
                return true;
            }
        }
        return false;
    }
}
