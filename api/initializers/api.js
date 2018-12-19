const express = require("express");
const cors = require("cors");
const config = require("../../config");

const startServer = async config => {
    const { log, startRedis } = require("../initializers");
    const api = express();
    const childLog = log.child({ module: "startServer" });
    /**
     * Initialization for bunyan logs
     */
    api.use(require("express-bunyan-logger")(log));
    // bunyan logs initialization ends

    /**
     * Add redisClient to service and service req object
     * to be able to initialize it from any controller if need be
     * in this case it should simply subscribe to a channel specified
     * so it can get messages.
     */
    let redisClient;
    try {
        childLog.info({ config: config.redis }, "Initializing Redis");
        redisClient = await startRedis(config);
    } catch (err) {
        childLog.error(err, "Redis Client Initialization Error");
    }
    redisClient.on_error = err => {
        childLog.error(err);
    };

    api.use((req, res, next) => {
        req.redisClient = redisClient;
        next();
    });
    // End Redis initialization

    // Set CORS
    api.use(cors());

    /**
     * Maintenance Route for heartbeat
     */
    api.get("/ping", (req, res) => {
        res.status(200).json({ sucess: true });
    });

    /**
     * Routes registration
     */
    api.use("/v1", require("../v1/routes").stream);
    // routes.heartbeat.register(api);
    // routes.stream.register(api);
    // Routes registration end

    const API = api.listen(config.api.server.port, () =>
        childLog.info({ config: config.api }, `Http server initialized ${config.api.server.port}`)
    );

    API.on("close", () => {
        redisClient.quit();
    });

    return API;
};

exports.startServer = startServer;
