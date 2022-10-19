import Ajv from "ajv";
import { NextFunction, RequestHandler } from "express";
import { HttpException } from "../exceptions/http-exception";

const ajv = new Ajv({
    $data: true
})

const validationMiddleware = (
    schema: any,
    value: 'body' | 'query' | 'params'
): RequestHandler => {
    return (req, res, next) => {
        const valiedate = ajv.compile(schema);
        if (valiedate(req[value])) {
            next()
        } else {
            valiedate.errors!.forEach(error => {
                let message = error.instancePath +' '+ error.message;
                if (error.keyword == 'pattern') {
                    message = error.instancePath +' invalid';
                }
                next(new HttpException(400, message))
            });
        }
    }
};

export default validationMiddleware;