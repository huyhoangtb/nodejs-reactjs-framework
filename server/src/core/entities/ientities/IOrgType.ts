import IEntityPermissionRole from "./base/IEntityPermissionRole";

export default interface IOrganization extends IEntityPermissionRole {
    path: string,
    children: [number]
}
