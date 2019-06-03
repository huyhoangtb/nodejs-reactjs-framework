import IEntity from "../../../core/entities/ientities/base/IEntity";

export default interface IDomain extends IEntity {
    domains: string[];
    saasDomains: string[];
    themeCode: string;
}