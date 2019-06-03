import IEntity from "./base/IEntity";

export default interface IRole extends IEntity {
    permissions: string[]
}
