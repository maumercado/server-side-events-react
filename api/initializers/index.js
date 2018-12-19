module.exports = {
    startRedis: require("./redis").startRedis,
    log: require("./log").log,
    startServer: require("./api").startServer
};
