import { Router } from "express";
import { IRoutes } from "interfaces/routes";
import AuthController from "./controller";
import {
    Links,
} from "./schema";
import validationMiddleware from "../../middlewares/validation";

export default class LinkRoute implements IRoutes {
    public router = Router();
    public controller = new AuthController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(
            "/links",
            validationMiddleware(Links, 'body'),
            this.controller.postLinks
        )

        this.router.get(
            "/links",
            this.controller.getLinks
        )
    }
}