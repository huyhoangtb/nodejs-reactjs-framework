'use strict';
import {Controller, Get, HeaderParam, JsonController, Post, UploadedFile, UploadOptions} from "routing-controllers";
import Result, {Failure, FailureWithException, Success} from "../../../core/responseable/Result";
import {Client} from "ssh2";
import {Inject} from "typedi";
import NodeRepository from "../../../core/repositories/node/NodeRepository";
import UploadService from "../../../services/file/UploadService";
import * as multer from "multer";
import ConfigsReader from "../../../configs/ConfigsReader";

export const FILE_UPLOAD_OPTIONS: UploadOptions = {
    options: {
        storage: multer.diskStorage({
            destination: (req: any, file: any, cb: any) => {
                console.log('destination', file);
            },
            filename: (req: any, file: any, cb: any) => {
                console.log('filename', file);
            }
        }),
        fileFilter: (req: any, file: any, cb: any) => {
            console.log('filename', file);
        },
        limits: {
            fieldNameSize: 255,
            fileSize: 1024 * 1024 * 2
        }
    }
}

@Controller('/file')
class FileController {
    @Inject('uploadService')
    uploadService: UploadService;

    @Post("/upload")
    async uploadAction(@UploadedFile("file") file: any, @HeaderParam('orgRootIid') orgRootIid: number,
                       @HeaderParam('userIid') userIid: number, @HeaderParam('orgIid') orgIid: number) {
        try {
            const folder = this.uploadService.getFolder(orgRootIid, userIid, orgIid);
            const r = await this.uploadService.uploadFileToRemoteServer(folder, file, {orgRootIid, userIid, orgIid});
            if (r) {
                return Success.setResult(r);
            }
            return Failure.setMessage('Cannot upload the file');
        } catch (e) {
            return FailureWithException(e);
        }
    }

    @Get("/test")
    async testAction() {
        // return Success.setResult(await this.uploadService.getDirectories('d://'));
        return Success.setResult(ConfigsReader.readConfig());
    }

}

export default FileController;