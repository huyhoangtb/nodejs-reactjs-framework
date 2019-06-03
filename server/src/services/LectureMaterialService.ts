import {Inject, Service} from "typedi";
import * as jwt from 'jsonwebtoken';
import UserRepository from "../repositories/UserRepository";
import Exception from "../core/exceptions/Exception";
import Status from "../configs/Status";
import IUser from "../core/entities/ientities/IUser";
import User from "../core/entities/schemas/User";
import {hashPassword, isCorrectPassword} from "../core/utils/password";
import {SignOptions} from "jsonwebtoken";
import JWT from "../configs/JWT";
import Redis from "../core/connections/redis/redis";
import RedisSet from "../common/redis/RedisSet";
import KeyGenerator from "../common/redis/KeyGenerator";
import IOrganization from "../core/entities/ientities/IOrganization";
import NodeRepository from "../core/repositories/node/NodeRepository";
import OrganizationRepository from "../repositories/organization/OrganizationRepository";
import LectureMaterialRepository from "../repositories/init-repo/LectureMaterialRepository";
import SyllabusRepository from "../repositories/init-repo/SyllabusRepository";
import ILectureMaterial from "../model/interfaces/mongo/ILectureMaterial";

@Service("userService")
export default class UserService {

    @Inject('lectureMaterialRepository')
    lectureMaterialRepository: LectureMaterialRepository;

    @Inject('syllabusRepository')
    syllabusRepository: SyllabusRepository;

    /**
     * create user and set user is owner of org (meaning site)
     *
     * @param user
     */
    async createLectureMaterial(lectureMaterial: ILectureMaterial) {
        return lectureMaterial;
    }
}
