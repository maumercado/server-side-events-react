const { startServer, log } = require("./api/initializers");
const config = require("./config");

const initialize = async () => {
    const childLog = log.child({ module: "API Initializer" });
    try {
        /**
         * Start API
         */
        await startServer(config);

        // End
    } catch (err) {
        childLog.error(err);
        process.exit(1);
    }
};

initialize();
