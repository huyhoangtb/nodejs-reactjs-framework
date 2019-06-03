import ApplicationContext from "../core/application/ApplicationContext";

export default class ServiceBase  extends ApplicationContext{

    public getContext() : void {
        console.log('test');
    }
}
