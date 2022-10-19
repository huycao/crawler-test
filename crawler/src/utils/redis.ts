import { createClient } from "redis";

const RedisClient = {
    instance: createClient()
}

export type RedisClient = typeof RedisClient;

Object.freeze(RedisClient);

export default RedisClient;