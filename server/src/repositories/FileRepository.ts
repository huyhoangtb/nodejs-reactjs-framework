import {Service} from "typedi";
import Repository from "../core/repositories/Repository";
import IFileDocument from "../model/interfaces/mongo/IFileDocument";
import FileDocument from "../model/mongo/FileDocument";

@Service("fileRepository")
export default class FileRepository extends Repository<IFileDocument> {

    constructor() {
        super(FileDocument);
    }


}

Object.seal(FileRepository);
