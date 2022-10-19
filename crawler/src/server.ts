import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import hpp from "hpp";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import errorMiddleware from "./middlewares/error";
import { IRoutes } from "./interfaces/routes";
import { logger, stream } from "./utils/logger";

export default class App {
    public app: Application;
    public env: string;
    public port: string | number;

    constructor(routes: IRoutes[]) {
        this.app = express();
        this.env = process.env.NODE_ENV || 'development';
        this.port = process.env.PORT || 4000;

        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initializeSwagger();
        this.initializeErrorHandling();
    }

    public listen() {
        this.app.listen(this.port, () => {
            logger.info(`server running on port : ${this.port}`);
            console.log(`server running on port : ${this.port}`);
        }).on('error', (e) => logger.error(e));
    }

    public getServer() {
        return this.app;
    }

    private initializeMiddlewares() {
        this.app.use(morgan(process.env.LOG_FORMAT as string, { stream }));
        this.app.use(cors({ origin: '*', credentials: true }));
        this.app.use(hpp());
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(cookieParser());
    }

    private initializeRoutes(routes: IRoutes[]) {
        routes.forEach(route => {
            this.app.use("/api", route.router);
        })
    }

    private initializeSwagger() {
        const options = {
            swaggerDefinition: {
                info: {
                    title: 'Crawler API',
                    version: '1.0.0',
                    description: 'Crawler docs',
                },
            },
            apis: ['swagger.yaml'],
        }
        const specs = swaggerJSDoc(options);
        this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }
}