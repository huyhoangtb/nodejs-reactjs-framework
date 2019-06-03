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

@Service("userService")
export default class UserService {

    @Inject('userRepository')
    userRepository: UserRepository;

    @Inject('organizationRepository')
    organizationRepository: OrganizationRepository;

    /**
     * create user and set user is owner of org (meaning site)
     *
     * @param user
     */
    async createOwnerOfOrg(user: IUser) {
        if(!user.paths) {
            user.paths = [`_${user.orgRootIid}_`];
        }
        const userCreated: IUser = await this.createUser(user);
        if (!userCreated) {
            return null;
        }
        this.setUserBelongOwnerOfOrg(userCreated);
        return userCreated;
    }

    async setUserBelongOwnerOfOrg(user: IUser) {
        // in the case create user for owner website, org
        const org: IOrganization = await this.organizationRepository.findByIid(user.orgRootIid);
        if (org) {
            org.ownerIid = user.iid;
            const updateResult = await this.organizationRepository.updateByIid(org.iid, org);
            //TODO: Check if update not success
        }
        return org;
    }
    /**
     *
     * @param user
     */
    async createUser(user: IUser) {
        const exception = new Exception();
        const orgIids = user.orgIids || [];
        orgIids.filter(orgIid => orgIid);
        if (!user.orgRootIid && orgIids.length <= 0) {
            exception.message = 'can not create user that dont belong a organization';
            throw exception;
        }

        await this.checkUserExisted(user);
        user.status = Status.ACTIVE;
        if (!user.username) {
            user.username = user.email;
        }
        if (user.password) {
            user.password = await hashPassword(user.password);
        }
        const result = await this.userRepository.create(user);
        if (result) {
            delete result.password;
        }
        return result;
    }

    /**
     *
     * @param user
     */
    async update(user: IUser) {
        await this.checkUserExisted(user);

        if (user.password) {
            user.password = await hashPassword(user.password);
        }
        const result = await this.userRepository.updateByIid(user.iid, user);
        if (result) {
            delete result.password;
        }
        return result;
    }

    async login(loginName: string, password: string) {
        let user: any = null;
        user = await this.getUserByLoginInfo(loginName, password);
        if (user === null) {
            return null;
        }
        const userKeys = {
            iid: user.iid,
            _iid: user._iid,
            orgIid: user.orgIid,
            rootOrgIid: user.rootOrgIid
        };
        const token = JWT.generateToken(userKeys);

        const authInfo = {
            token,
            expiresIn: new Date().getTime() + JWT.DEFAULT_EXPIRES_IN,
        }
        await RedisSet.set(KeyGenerator.generateTokenKey(user.iid, token), userKeys);
        return {
            authInfo,
            user: {...user, password: undefined}
        }
    }

    async getUserByLoginInfo(loginName: string, password: string): Promise<any> {
        const conditionDocument = {
            email: loginName,
            username: loginName,
            code: loginName,
            iid: parseInt(loginName),
        }
        let user: any = null;
        user = await this.userRepository.findOneDocumentsWithAnyKeys(conditionDocument, 'email', 'username', 'code', 'iid');
        if (user === null) {
            return null;
        }
        if (!await isCorrectPassword(password, user['password'])) {
            return null;
        }
        return user;
    }

    private async checkUserExisted(user: IUser) {
        const exception = new Exception();

        //email: hoangnh@system.com already existed. Please double check!...
        exception.message = '%s: %s already existed. Please double check!...';

        let userExisted = await this.userRepository.checkExistedDocumentWithAnyKeys(user, 'email');
        if (userExisted) {
            exception.messageParams = ['email', user.email];
            throw exception;
        }

        userExisted = await this.userRepository.checkExistedDocumentWithAnyKeys(user, 'username');
        if (userExisted) {
            exception.messageParams = ['username', user.username];
            throw exception;
        }

        userExisted = await this.userRepository.checkExistedDocumentWithAnyKeys(user, 'code');
        if (userExisted) {
            exception.messageParams = ['code', user.code];
            throw exception;
        }

    }
}
