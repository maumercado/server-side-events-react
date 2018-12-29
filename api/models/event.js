const validateEvent = require("@segment/loosely-validate-event");
const normalizeForSearch = require("normalize-for-search");
const objectValues = require("nested-object-values");
const _ = require("lodash");
const moment = require("moment");

class Event {
    constructor(options) {
        const time = options.receivedAt || moment().format();
        this.data = options;
        this.id = options.messageId;
        this.normalValues = null;
        this.type = options.type;
        this.time = time;
        this.description = null;
        this.process();
        this.validate();
    }

    validate() {
        try {
            validateEvent(this.data);
        } catch (err) {
            err.context = "Error validating event.";
            throw err;
        }
    }

    JSONString() {
        const { data, time, id, normalValues, type, description } = this;
        return JSON.stringify({
            data,
            time,
            id,
            normalValues,
            type,
            description
        });
    }
    process() {
        this.normalValues = objectValues(this.data)
            .map(val => {
                if (typeof val === "string") {
                    return normalizeForSearch(val);
                }
            })
            .filter(item => item !== undefined && item.length > 0);
        this.normalValues = this.normalValues.join(" ");
        this.description = eventTitle(this.data);
    }
}

const eventTitle = event => {
    const id = event.userId;

    switch (event.type) {
        case "alias":
            return `Alias merge from ${event.previousId} to: ${id || "unknown"}`;
        case "identify":
            if (!id) {
                return `Anonymous ID: ${event.anonymousId}`;
            }
            return `Identified user with ID: ${id}`;
        case "group":
            return `Associated ${event.userId || event.anonymousId} with: ${event.groupId}`;
        case "page":
            return _.get(event, "properties.path", "Unknown Page");
        case "track":
            return `${event.event}`;
        case "screen":
            return ` Viewed ${event.name || " "}Screen`;
        default:
            return "Unknown Request";
    }
};

module.exports = { Event };
