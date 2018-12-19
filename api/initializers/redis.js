const config = require("../../config");
const redis = require("redis");
const asyncRedis = require("async-redis");

const MAX_RETRIES = 50;

const startRedis = async config => {
    const { log } = require("../initializers");
    const childLog = log.child({ module: "Redis Initializer" });
    const retryStrategy = options => {
        childLog.warn({ options }, "Retrying to connect");
        if (options.total_retry_time > 1000 * 60 * 60) {
            const error = new Error("Redis Disconnected retry exhausted");
            childLog.error(error);
            return error;
        }

        if (options.attempt >= MAX_RETRIES) {
            throw new Error("Check connection to redis!");
        }

        return Math.min(options.attempt * 100, 3000);
    };

    config.api.redis.retry_strategy = retryStrategy;
    return asyncRedis.decorate(redis.createClient(config.api.redis));
};

exports.startRedis = startRedis;
