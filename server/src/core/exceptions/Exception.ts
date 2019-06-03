import {vsprintf} from "sprintf-js";

export default class Exception extends Error {

    protected _success: boolean = false;
    protected _message: any;
    protected _status: number;
    protected _messageParams: any[];
    protected _detail: object;
    protected _error: {
        code: string,
        desc: string
    };

    constructor(message?: string, detail?: any, error?: any) {
        super();
        this._message = message;
        this._detail = detail;
        this._error = error;
    }

    set message(value: string) {
        this._message = value;
    }

    set status(value: number) {
        this._status = value;
    }

    set detail(value: object) {
        this._detail = value;
    }

    set error(value: { code: string; desc: string }) {
        this._error = value;
    }
    set messageParams(messageParams:  any[]) {
        this._messageParams = messageParams;
    }
    get messageParams(): any[] {
        return this._messageParams;
    }

    get status(): number {
        return this._status;
    }
    get success(): boolean {
        return this._success;
    }

    get message(): string {
        return vsprintf(this._message, this._messageParams);
    }

    get detail(): object {
        return this._detail;
    }

    get error(): { code: string; desc: string } {
        return this._error;
    }

}
