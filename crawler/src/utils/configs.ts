import path from "path";
import envSchema from "env-schema";
import S from "fluent-json-schema";
import Ajv from "ajv";

export default function loadConfig(): void {
    const result = require('dotenv').config({
        path: path.join(__dirname, '..', '..', '.env')
    })

    if (result.error) {
        throw new Error(result.error)
    }

    envSchema({
        data: result.parsed,
        ajv: new Ajv({
            allErrors: true,
            removeAdditional: true,
            useDefaults: true,
            coerceTypes: true,
            allowUnionTypes: true
        }),
        schema: S.object()
            .prop('NODE_ENV', S.string().enum(['development', 'testing', 'production']))
            .prop('PORT', S.number().default(4000))
            .prop('JWT_SECRET', S.string())
            .prop('SESSION_SECRET', S.string())
            .prop('LOG_FORMAT', S.string())
            .prop('LOG_LEVEL', S.string())
            .required(['NODE_ENV','PORT','JWT_SECRET','SESSION_SECRET','LOG_FORMAT','LOG_LEVEL'])
    })
}