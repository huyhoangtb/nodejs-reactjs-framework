export default class ApplicationContext {
    public static  request: any = {};

    static pushRequest(rid: string, storeData: any) {
        ApplicationContext.request[rid] = storeData
    }

}