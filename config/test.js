const port = parseInt(process.env.SERVER_PORT, 10) || 9000;

module.exports = {
    api: {
        server: {
            port
        },
        log: {
            level: process.env.LOG_LEVEL || "fatal"
        },
        redis: {
            host: process.env.REDIS_HOST || "localhost",
            port: parseInt(process.env.REDIS_PORT, 10) || 6379,
            db: parseInt(process.env.REDIS_DB, 10) || 1,
            channel: process.env.REDIS_CHANNEL || "events"
        }
    },
    client: {
        server: process.env.SERVER_URL || `localhost:${port}`
    }
};
