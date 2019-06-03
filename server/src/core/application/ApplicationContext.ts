import * as fs from "fs";

var sprintf = require('sprintf-js').sprintf,
    vsprintf = require('sprintf-js').vsprintf

// sprintf('%2$s %3$s a %1$s', 'cracker', 'Polly', 'wants')
// vsprintf('The first 4 letters of the english alphabet are: %s, %s, %s and %s', ['a', 'b', 'c', 'd'])
const privateKeys: object = {};

export default class ApplicationContext {

    // public static getAppKey(): string {
    //     return this.getPrivateKey('obolex');
    // }
    //
    // public static getSessionPassword(): string {
    //     return this.getPrivateKey('obolex');
    // }

    // public static getPrivateKey(path): string {
    //     if (privateKeys[path]) {
    //         return privateKeys[path];
    //     }
    //     const key = fs.readFileSync(`${ __dirname}/../../../keys/${path}.ppk`);  // get private key
    //     privateKeys[path] = key.toLocaleString();
    //     return privateKeys[path];
    // }

}
