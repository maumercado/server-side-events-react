const initialize = () => {
    const { startServer, log } = require("./api/initializers");
    const childLog = log.child({ module: "API Initializer" });
    log.info("Starting Server");
    try {
        /**
         * Start API
         */
        startServer();

        // End
    } catch (err) {
        childLog.error(err);
        process.exit(1);
    }
};

initialize();
