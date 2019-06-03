import IEntity from "../../../core/entities/ientities/base/IEntity";
import {IsEmail} from "class-validator";

export default interface ISyllabus extends IEntity {
    itemType: string;
    skills: number[];
    introduction: string;
    learningItem: any;
}