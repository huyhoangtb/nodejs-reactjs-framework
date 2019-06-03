import {Action} from "routing-controllers";
import RedisSet from "../../common/redis/RedisSet";
import KeyGenerator from "../../common/redis/KeyGenerator";
import JWT from "../../configs/JWT";
import NodeRepository from "../repositories/node/NodeRepository";
import Status from "../../configs/Status";
import Exception from "../exceptions/Exception";

export default class ApplicationSecurity {

    async authorizationChecker(action: Action, permissions: string[]) {
        try {
            const token = action.request.headers["passport"];
            const userIid = action.request.headers["userIid"];
            ApplicationSecurity.autoInsertPermissions(permissions);

            JWT.verifyToken(token)

            // action.request.query
            const userStoreByToken = await RedisSet.get(KeyGenerator.generateTokenKey(userIid, token));
            if (!userStoreByToken) {
                console.log(1);
                action.response.status(403);
                return false;
            }

            const nodeRepository = new NodeRepository();
            const user = await nodeRepository.getCollectionDetail('user', {iid: userStoreByToken.iid});

            if (!user) {
                console.log(2);
                action.response.status(403);
                return false;
            }

            return user;
        } catch (e) {
            const ex = new Exception();
            ex.status = 403;
            throw ex;
        }
    }

    static autoInsertPermissions(permissions: string[]) {
        const nodeRepository = new NodeRepository();
        permissions = permissions || [];
        permissions.map(async permission => {
            const p = await nodeRepository.getCollectionDetail('permission', {code: permission});
            if (!p || Object.keys(p).length === 0) {
                await nodeRepository.create('permission', {
                    code: permission,
                    name: permission,
                    status: Status.ACTIVE
                })
            }
        })

    }
}
