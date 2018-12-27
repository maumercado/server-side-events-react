const bunyan = require("bunyan");
const git = require("git-rev-sync");
const _ = require("lodash");
const { config } = require("../../config");

const log = bunyan.createLogger({
    name: "maugger",
    level: _.get(config, "api.log.level", "info"),
    stream: process.stdout,
    commit: `Deployed: ${git.short()} - ${git.branch()}`
});

module.exports = { log };
