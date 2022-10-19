import { Application, Request, Response, NextFunction } from "express";
import { logger } from "./logger";

export default function loadErrorHandlers(server: Application) {
    server.use((req, res, next) => {
        interface CustomError extends Error {
            status?: number;
        }

        const err: CustomError = new Error('Not Found');
        err.status = 404;
        next(err);
    })
    server.use((err: any, req: Request, res: Response, next: NextFunction) => {
        if (err.name === 'ValidationError') {
            return err.status(422).json({
                errors: Object.keys(err.errors).reduce(function (errors: any, key: string) {
                    errors[key] = err.errors[key].message;
                    return errors;
                }, {})
            });
        }
        logger.error(err);
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message,
                error: process.env.NODE_ENV === 'development' ? err : {}
            }
        });
    });
}