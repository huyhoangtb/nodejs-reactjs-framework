import {Client, SFTPWrapper} from "ssh2";
import ConfigsReader from "../../../configs/ConfigsReader";

var connSettings = {
    host: 'localhost',
    port: 22, // Normal is 22 port
    username: 'peter hoang nguyen',
    password: 'nlntmttaum'
    // You can use a key file too, read the ssh2 documentation
};


class SSH2 {
    static getConnection(): Promise<Client> {
        const conn = new Client();
        return new Promise(resolve => {
            conn.on('ready', function () {
                resolve(conn);
            }).connect(connSettings);
        });
    }

    static getSftpConnection(conn: Client): Promise<SFTPWrapper> {
        return new Promise((resolve, reject) => {
            if(!conn) {
                return resolve();
            }
            conn.sftp(function (err: Error, sftp: SFTPWrapper) {
                console.log(err);
                if (err) reject(null);

                resolve(sftp);
            });
        });
    }

    static getRoot() {
        return ConfigsReader.readConfig().cdnRootDir || '/root'
    }

    static getTemp() {
        return ConfigsReader.readConfig().uploadTmpDir || '/tmp'
    }
}


export default SSH2