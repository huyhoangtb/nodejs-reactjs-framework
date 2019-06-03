import IEntity from "../../../core/entities/ientities/base/IEntity";

export default interface IFileDocument extends IEntity {
    originalName: string,
    encoding: string,
    mimetype: string,
    size: number,
    status: number,
    folder: string,
    localFileName: string,
    url: String
    orgIid: number,
    orgRootIid: number,
    path: String
}
