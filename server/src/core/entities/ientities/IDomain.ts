import IEntity from "./base/IEntity";

export default interface IDomain extends IEntity {
    orgIid: number,
    domains: string[];
    saasDomains: string[];
}
