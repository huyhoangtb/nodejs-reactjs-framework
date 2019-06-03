import {ExpressErrorMiddlewareInterface, Middleware} from "routing-controllers";

@Middleware({type: 'after'})
export class DefaultExceptionTrigger implements ExpressErrorMiddlewareInterface {
    error(error: any, request: any, response: any, next: (err: any) => any) {
        response.status(error.status || error.httpCode || 500)
            .json({
                name: error.name,
                message: error.message,
                status: error.httpCode,
                stack: error.stack,
            })
    }

}
