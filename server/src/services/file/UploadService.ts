import {Inject, Service} from "typedi";
import SSH2 from "../../core/connections/ssh2";
import {Client, SFTPWrapper} from "ssh2";
import * as fs from 'fs';
import Slug from "../../common/slug";
import FileRepository from "../../repositories/FileRepository";
import IFileDocument from "../../model/interfaces/mongo/IFileDocument";
import {InputAttributes} from "ssh2-streams";
import SaasUtils from "../../core/SaasUtils";

@Service("uploadService")
export default class UploadService {


    @Inject('fileRepository')
    fileRepository: FileRepository;

    async getDirectories(dir: string) {
        return new Promise(async (resolve, reject) => {
            const conn: Client = await SSH2.getConnection();
            const sftp: SFTPWrapper = await SSH2.getSftpConnection(conn);
            if (!sftp) {
                resolve([]);
            }

            sftp.readdir(dir, (err: any, list: any[]) => {
                if (err) reject(err);
                resolve(list);
                conn.end();
            });

        })
    }

    async downloadFileToLocal(fromRemoteDir: string, localDir: string) {

        const conn: Client = await SSH2.getConnection();
        const sftp: SFTPWrapper = await SSH2.getSftpConnection(conn);

        return new Promise((resolve, reject) => {
            if (!sftp) {
                resolve([]);
            }

            sftp.fastGet(fromRemoteDir, localDir, {}, function (downloadError: any) {
                if (downloadError) throw reject(downloadError);
                resolve(true); //success to download to local or something
                conn.end();
            });

        })
    }

    async uploadFileToRemoteServer(folder: string, file: any, options:any = {}) {
        const conn: Client = await SSH2.getConnection();
        const sftp: SFTPWrapper = await SSH2.getSftpConnection(conn);
        const FileDocument: IFileDocument = await this.createFileDocument(file, folder, options);

        return new Promise(async (resolve, reject) => {
            if (!sftp) {
                resolve([]);
            }

            const tmplDirFolder = `${SSH2.getTemp()}/${folder}`;
            const uploadFolder = `${SSH2.getRoot()}/${folder}`;

            await this.createLocalFolderIfNotExists(tmplDirFolder);
            await this.createRemoteFolderIfNotExists(sftp, uploadFolder);

            const tmplDir = `${SSH2.getTemp()}/${folder}/${file.originalname}`;
            const uploadDir = `${SSH2.getRoot()}/${folder}/${file.originalname}`;

            fs.writeFile(tmplDir, file.buffer, async (err: any) => {
                if (err) {
                    return reject(err);
                }
                const readStream = fs.createReadStream(tmplDir);
                const writeStream = sftp.createWriteStream(uploadDir);

                writeStream.on('close', function () {
                    sftp.end();
                });

                writeStream.on('end', function () {
                    conn.end();
                });

                await readStream.pipe(writeStream);
                fs.unlinkSync(tmplDir);
                resolve(await this.fileRepository.create(FileDocument));
            });
        });
    }

    async remoteFileFromRemoteServer(remoteDir: string, remoteFilename: string) {
        const conn: Client = await SSH2.getConnection();
        const sftp: SFTPWrapper = await SSH2.getSftpConnection(conn);

        return new Promise(async (resolve, reject) => {
            if (!sftp) {
                resolve([]);
            }
            sftp.unlink(`${remoteDir}/${remoteFilename}`, function (err) {
                conn.end();
                if (err) {
                    return reject(false);
                }
                resolve(true)

            });
        });
    }

    async chmod(path: string, mode: number) {
        const conn: Client = await SSH2.getConnection();
        const sftp: SFTPWrapper = await SSH2.getSftpConnection(conn);

        return new Promise(async (resolve, reject) => {
            if (!sftp) {
                resolve([]);
            }
            sftp.chmod(path, 777, (err) => {
                conn.end();
                if (err) {
                    return reject(false);
                }
                resolve(true)

            });
        })
    }

    createLocalFolderIfNotExists(folder: string) {
        let path = '';
        if (!fs.existsSync(folder)) {
            const folders = folder.split('/');
            for (let i =0; i<folders.length; i++) {
                path = !path ? folders[i] : `${path}/${folders[i]}`;
                if (!fs.existsSync(path)) {
                    fs.mkdirSync(path);
                }
            }
        }
    }

    createRemoteFolderIfNotExists(sftp: SFTPWrapper, folder: string) {

        return new Promise(async resolve => {

            const isExists = await this.sftpCheckDirectory(sftp, folder);
            if (isExists) {
                return resolve(true);
            }
            let path = '';
            const folders = folder.split('/');

            for (let i =0; i<folders.length; i++) {
                path = !path ? folders[i] : `${path}/${folders[i]}`;
                await this.sftpMkdir(sftp, path);
            }
            resolve(false);

        });
    }

    sftpCheckDirectory(sftp: SFTPWrapper, folder: string) {
        return new Promise(async resolve => {
            try {
                sftp.readdir(folder, (err: any, list: any[]) => {
                    if (!err) return resolve(true);
                    resolve(false);
                });
            } catch (e) {
                resolve(false);
            }
        });
    }

    sftpMkdir(sftp: SFTPWrapper, folder: string) {
        return new Promise(async resolve => {
            sftp.mkdir(folder, err => {
                if (err) {
                    return resolve(false);
                }
                return resolve(folder);
            });
        });
    }

    async createFileDocument(file: any, folder: string, options:any = {}) {

        const {orgRootIid, userIid, orgIid} = options;
        const {user, org} = await SaasUtils.getUserAndWorkingOrg(orgRootIid, orgIid, userIid);
        const fileDocument: any = SaasUtils.attachUserAndOrgInforDefaultWhenCreateDocument(user, org);;
        fileDocument.encoding = file.encoding;
        fileDocument.originalName = file.originalName || file.originalname;
        fileDocument.folder = folder;
        fileDocument.mimetype = file.mimetype;
        fileDocument.size = file.size;
        fileDocument.url = `${folder}/${fileDocument.originalName}`;
        fileDocument.ext = this.getExtentionOfFile(fileDocument.originalName);
        fileDocument.localFileName = Slug.get(fileDocument.originalName);
        return fileDocument;
    }

    getExtentionOfFile(fileName: string) {
        if (!fileName) {
            return '';
        }
        const fileNameParts = fileName.split('.');
        return fileNameParts[fileNameParts.length - 1]
    }

    getFolder(rootOrgIid: number, orgIid: number, userIid: number) {
        rootOrgIid = rootOrgIid || 0;
        orgIid = orgIid || 0;
        userIid = userIid || 0;

        return `${rootOrgIid}/${orgIid}/${userIid}`;
    }
}
