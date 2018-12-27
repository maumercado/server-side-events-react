const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
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
     * REACT app set up code
     */

    api.engine("html", (filePath, options, callback) => {
        fs.readFile(filePath, (err, content) => {
            if (err) {
                return callback(err);
            }
            // this is an extremely simple template engine
            const rendered = content.toString().replace("{{{config}}}", JSON.stringify(options.config));
            return callback(null, rendered);
        });
    });

    api.set("views", path.join(__dirname, "../../client/build"));
    api.set("view engine", "html");

    api.get("/", (req, res) => {
        res.render("index", { config: config.client });
    });

    api.use(express.static(path.join(__dirname, "../../client/build")));

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
