import JobPosition from "./mongo/JobPosition";
import Role from "./mongo/Role";
import Permission from "./mongo/Permission";



export default class InitModel {
    public static init() {
        const jobPosition = new JobPosition();
        const role = new Role();
        const permission = new Permission();
    }
}