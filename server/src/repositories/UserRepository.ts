import Status from "../configs/Status";
import {Service} from "typedi";
import Repository from "../core/repositories/Repository";
import IUser from "../core/entities/ientities/IUser";
import User from "../model/mongo/User";

@Service("userRepository")
export default class UserRepository extends Repository<IUser> {

    constructor() {
        super(User);
    }

    /**
     *
     * @param {IUser} user
     * @returns {Promise<"mongoose".Document>}
     */
    public async createUser(user: IUser) {
        user.status = Status.INACTIVE;
        // const password = await hashPassword(user.password);
        // if (password === undefined) {
        //     throw new ValidationException('The password you enter was wrong!!..');
        // }
        // user.password = password;
        // User.findById()
        return await this.create(user);
    }

}

Object.seal(UserRepository);
