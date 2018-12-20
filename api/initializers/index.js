module.exports = {
    startRedis: require("./redis").startRedis,
    log: require("./log").log,
    startServer: require("./api").startServer,
    subscribe: require("./redis").subscribe,
    retryStrategy: require("./redis").retryStrategy,
    closeRedisConnection: require("./redis").closeRedisConnection
};
