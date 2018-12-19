const EventEmitter = require("events");
const config = require("../../../config");

const Stream = new EventEmitter();

const read = async (req, res, next) => {
    const log = req.log.child({
        ctrl: "stream controller",
        ctrlFunction: "read"
    });

    const redisSub = req.redisClient;

    /**
     * First send history of saved events (saved somewhere),
     * on request get those events and send them to the
     * client as stored-events once all these events have passed
     * send an event to the client from the server
     * called finished-historical or done-history
     * then start pushing new events through another
     * event called "push"
     */

    res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive"
    });

    req.on("close", () => {
        Stream.removeAllListeners("push");
        res.end();
        log.info("Client closed connection to read stream");
    });

    /**
     *
     * @param event type of event received
     * @param data JSON object to send to server
     *
     * Callback for push events
     */
    const sendData = (event, data) => {
        const dataJSON = JSON.parse(data);
        const { type, messageId, context, receivedAt, sentAt, userId, anonymousId } = dataJSON;
        log.info(
            {
                event,
                type,
                messageId,
                context,
                receivedAt,
                sentAt,
                userId,
                anonymousId
            },
            "Sending event to client"
        );

        res.write(`event: ${String(event)}\n` + `data: ${data}\n\n`);
    };
    /**
     * Create listener for push events
     */
    Stream.on("push", sendData);
    Stream.on("loaded", sendData);

    redisSub.on("subscribe", (channel, count) => {
        log.info({ channel }, "Redis subscription ready");
        Stream.emit("loaded", "loaded", JSON.stringify({ done: true }));
    });

    redisSub.on("message", (channel, message) => {
        log.info(`sub channel ${channel}: ${message}`);
        Stream.emit("push", "event", message);
    });

    try {
        await redisSub.subscribe(config.api.redis.channel);
    } catch (err) {
        log.error(err, `Error subscribing to ${config.api.redis.channel}`);
        next(err);
    }
};

module.exports = read;
