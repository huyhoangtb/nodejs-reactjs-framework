import IEntity from "./base/IEntity";

export default interface IUser extends IEntity {
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    email: string,
    phone: string,
    address: string,
    accountStatus: number,
    notes: string,
    paths: string[]
}