const fs = require("fs");

const routes = {};

fs.readdirSync(__dirname)
    .filter(file => file !== "index.js")
    .forEach(file => {
        routes[file.split("_")[0]] = require(`./${file}`);
    });

module.exports = { routes };
