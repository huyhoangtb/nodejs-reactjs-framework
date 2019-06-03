import Exception from "./Exception";

export default class ValidationException extends Exception {

    public EXCEPTION_TYPE = Exception.TYPE.VALIDATION;

    constructor(message: String, detail?: any, error?: any) {
        super(message, detail, error);
    }

    public toString() {
        return this.data.message + JSON.stringify(this.data.detail) + JSON.stringify(this.data.error);
    }
}
