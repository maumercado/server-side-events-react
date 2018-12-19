const bunyan = require("bunyan");
const config = require("../../config");
const git = require("git-rev-sync");

const log = bunyan.createLogger({
    name: "maugger",
    level: config.api.log.level,
    stream: process.stdout,
    commit: `Deployed: ${git.short()} - ${git.branch()}`
});

exports.log = log;
