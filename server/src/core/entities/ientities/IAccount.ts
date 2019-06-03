import IEntityPermissionRole from "./base/IEntityPermissionRole";

export default interface IAccount extends IEntityPermissionRole {
    userIid: number;
    logins: string;
    password: string;
}
