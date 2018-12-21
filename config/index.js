const port = parseInt(process.env.SERVER_PORT, 10) || 4000;
const _ = require("lodash");
const redisMod = require("../api/initializers");

let config = {
    api: {
        server: {
            port
        },
        log: {
            level: process.env.LOG_LEVEL || "debug"
        },
        redis: {
            host: process.env.REDIS_HOST || "localhost",
            port: parseInt(process.env.REDIS_PORT, 10) || 6379,
            db: parseInt(process.env.REDIS_DB, 10) || 0,
            channel: process.env.REDIS_CHANNEL || "events",
            retry_strategy: redisMod.retryStrategy
        }
    },
    client: {
        server: process.env.SERVER_URL || `localhost:${port}`
    }
};

switch (process.env.NODE_ENV) {
    case "test":
        config = _.merge(config, require("./test"));
        break;
    case "production":
        config = _.merge(config, require("./production"));
        break;
    default:
        break;
}

module.exports = { config };
