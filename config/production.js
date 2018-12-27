const port = parseInt(process.env.SERVER_PORT, 10) || 4000;
module.exports = {
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
            channel: process.env.REDIS_CHANNEL || "events"
        }
    },
    client: {
        server: process.env.SERVER_URL || `http://localhost:${port}`
    }
};
