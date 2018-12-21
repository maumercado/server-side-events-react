const express = require("express");
const cors = require("cors");
const { config } = require("../../config");

const startServer = () => {
    const { log } = require("./");
    const { stream } = require("../v1/routes").routes;
    const api = express();
    const childLog = log.child({ module: "startServer" });
    /**
     * Initialization for bunyan logs
     */
    api.use(require("express-bunyan-logger")(log));
    // bunyan logs initialization ends

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
    api.use("/v1", stream.loadRoutes());

    const API = api.listen(config.api.server.port, () =>
        childLog.info({ config: config.api }, `Http server initialized ${config.api.server.port}`)
    );

    return API;
};

module.exports = { startServer };
