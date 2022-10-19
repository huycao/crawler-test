import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { HttpException } from "../exceptions/http-exception";
import { DataStoreInToken } from "../interfaces/auth";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization')!.split('Bearer ')[1] : null);
        if (Authorization) {
            const secretKey = process.env.JWT_SECRET as string;
            const verificationResponse = (await verify(Authorization, secretKey)) as DataStoreInToken;
            // req.userRequest = verificationResponse.name
            next();
        } else {
            next(new HttpException(401, 'Authentication token missing'));
        }
    } catch(error) {
        next(new HttpException(401, 'Wrong authentication token'));
    }
}
export default authMiddleware;