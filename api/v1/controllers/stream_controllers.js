const Event = require("../../models/event");
const { subscribe, closeRedisConnection } = require("../../initializers");
const config = require("../../../config");

const read = async (req, res, next) => {
    let redisClient = null;
    const log = req.log.child({
        ctrl: "stream controller",
        ctrlFunction: "read"
    });

    req.on("close", async () => {
        if (!res.finished) {
            log.warn("Client closed connection to read stream");
            try {
                await closeRedisConnection(redisClient);
            } catch (err) {
                log.warn(err, "Redis connection not shutdown properly");
            }
            res.end();
        }
    });

    res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive"
    });

    /**
     *
     * @param event type of event received
     * @param data JSON stringify object to send to server
     *
     * Callback for push events
     */
    const sendData = (eventString, data) => {
        if (!res.finished) {
            res.write(`event: ${String(eventString)}\n` + `data: ${data}\n\n`);
        }
    };

    try {
        const subscriptionCb = (channel, count) => {
            log.info({ channel }, "Redis subscription ready");
            sendData("loaded", JSON.stringify({ done: true }));
        };

        const messageCb = (channel, message) => {
            try {
                const dataJSON = JSON.parse(message);
                const event = new Event(dataJSON);
                const { type, id, receivedAt } = event;
                log.info({ emit: "event", id, type, receivedAt }, "Sending event to client");
                sendData("event", event.JSONString());
            } catch (err) {
                // This could go into a queue for erroneous events
                log.warn({ err, message }, "Ignoring event");
            }
        };

        redisClient = subscribe(messageCb, subscriptionCb);
    } catch (err) {
        log.error(err, `Error subscribing to ${config.api.redis.channel}`);
        next(err);
    }
};

module.exports = { read };
