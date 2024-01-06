import Redis from "ioredis";

const getRedisUrl = () => {
    if (process.env.REDIS_URL) {
        return process.env.REDIS_URL;
    }
    throw new Error("Redis url not found");
};

const redis = new Redis(getRedisUrl());

export default redis;
