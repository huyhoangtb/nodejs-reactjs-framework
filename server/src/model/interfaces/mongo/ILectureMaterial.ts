import IEntity from "../../../core/entities/ientities/base/IEntity";
import {IsEmail} from "class-validator";

export default interface ILectureMaterial extends IEntity {
    itemType: string;
    skills: number[];
    introduction: string;
    videoUrl: string;
    hostedType: string;
    children: object[];
}