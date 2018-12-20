const assert = require("assert");
const redis = require("redis");
const { log } = require("./log");
const config = require("../../config");
const childLog = log.child({ module: "Redis Module" });

const MAX_RETRIES = 50;

/**
 * https://github.com/NodeRedis/node_redis
 * @param {*} options - Read node retry strategy
 */
const retryStrategy = options => {
    childLog.warn({ options }, "Retrying to connect");
    if (options.error.code === "ECONNREFUSED") {
        // End reconnecting on a specific error and flush all commands with a individual error
        return new Error("The server refused the connection");
    }

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

/**
 *
 * @param {*} mCB - Callback for subscriber "message" event
 * @param {*} [sCB] - Callback for subscriber "subscribe" event
 */
const subscribe = (mCB, sCB) => {
    const subscriber = redis.createClient(config.api.redis);
    assert(subscriber instanceof redis.RedisClient, "client must be an instance of redis client");
    assert(typeof mCB === "function", `callback must be a function, received: ${typeof mCB}`);
    if (typeof sCB === "function") {
        subscriber.on("subscribe", sCB);
    }

    subscriber.on("message", mCB);

    subscriber.on("error", err => {
        childLog.error({ err }, `Redis error`);
    });

    subscriber.subscribe(config.api.redis.channel);
    return subscriber;
};

const closeRedisConnection = subscriber => {
    return new Promise((resolve, reject) => {
        subscriber.quit(err => {
            if (err) return reject(err);
            return resolve();
        });
    });
};

module.exports = {
    retryStrategy,
    subscribe,
    closeRedisConnection
};
