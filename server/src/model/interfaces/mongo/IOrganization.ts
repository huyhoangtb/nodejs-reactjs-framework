import IEntity from "../../../core/entities/ientities/base/IEntity";
import {IsEmail} from "class-validator";

export default interface IOrganization extends IEntity {
    companyName: string;
    companyCode: string;
    shortName: string;
    phone: string;
    email: string;
    address: string,
    logo_id: string,
    notes: string
    path: string
}