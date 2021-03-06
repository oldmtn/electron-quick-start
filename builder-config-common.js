﻿const packageJson = require("./package.json");

// see https://www.electron.build/configuration/configuration#configuration
let buildConfigCommon = {
    "productName": `${packageJson.name}`,
    "appId": `${packageJson.name}`,
    "files": [
        "**/*"
    ],
    "directories": {
        "buildResources": "app",
        "output": "output",
        "app": "app"
    },
    "compression": "maximum"
};

module.exports = buildConfigCommon;


