import ApplicationContext from "../core/application/ApplicationContext";
import Result, {Success} from "../core/responseable/Result";

export const isEmail = (email: string, applicationContext: any): Result => {
    let appCtx = applicationContext;
    if (!appCtx) {
        appCtx = new ApplicationContext();
    }

    if (!email) {
        return new Result().setFailure().setMessage('Email is Required!')
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        return new Result().setFailure().setMessage('Email is invalid, please double check!')
    }

    return Success

}
