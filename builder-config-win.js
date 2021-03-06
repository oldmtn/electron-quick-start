﻿
const packageJson = require("./package.json");
const buildConfigCommon = require("./builder-config-common");

// see https://www.electron.build/configuration/configuration#configuration

let buildConfigWin = {
    "nsis": {
        "artifactName": `${packageJson.name}-${packageJson.version}.exe`,
        "perMachine": true,
        "oneClick": false,
        "warningsAsErrors": false,
        "deleteAppDataOnUninstall": true,
        // "allowElevation": true,
        "createDesktopShortcut": "always",
        "allowToChangeInstallationDirectory": true,
        "runAfterFinish": true
    },
    "win": {
        "icon": "public/favicon.png",
        "target": [
            {
                "target": "nsis",
                "arch": [
                    "ia32"
                ]
            }
        ]
    }
};

Object.assign(buildConfigWin, buildConfigCommon);

module.exports = buildConfigWin;


