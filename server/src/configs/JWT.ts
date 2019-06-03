import {SignOptions} from "jsonwebtoken";
import * as jwt from "jsonwebtoken";

export default class JWT {
    static PRIVATE_KEY = 'hoangnh';
    static DEFAULT_EXPIRES_IN = 3600; //should be a number of seconds or string representing a timespan

    static SIGNOPTION: SignOptions = {
        issuer: 'This company name',
        subject: 'This is company email',
        audience: 'this is company website',
        expiresIn: JWT.DEFAULT_EXPIRES_IN,
    };

    static generateToken(playload: any) {
       return jwt.sign(playload, JWT.PRIVATE_KEY, JWT.SIGNOPTION);
    }

    static verifyToken(token: string) {
        return jwt.verify(token, JWT.PRIVATE_KEY);
    }
}