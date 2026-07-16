"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  DiscordLog: () => DiscordLog,
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);

// src/DiscordLog.ts
var import_axios = __toESM(require("axios"), 1);

// src/isLogLevel.ts
var LOG_LEVELS = [
  "DEBUG",
  "INFO",
  "WARNING",
  "ERROR",
  "CRITICAL"
];
function isLogLevel(value) {
  return LOG_LEVELS.includes(value);
}

// src/DiscordLog.ts
var DiscordLog = class {
  webhookUrl;
  level;
  levels = ["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"];
  constructor(webhookUrl, options = {}) {
    if (!webhookUrl) throw Error("webhookURL is required");
    this.webhookUrl = webhookUrl;
    const level = options.level?.toUpperCase() ?? "ERROR";
    if (isLogLevel(level)) {
      this.level = level;
    } else {
      throw Error("Valid minimum logging level required");
    }
  }
  debug(message, error = null) {
    this.log(message, "DEBUG", error);
  }
  info(message, error = null) {
    this.log(message, "INFO", error);
  }
  warning(message, error = null) {
    this.log(message, "WARNING", error);
  }
  error(message, error = null) {
    this.log(message, "ERROR", error);
  }
  critical(message, error = null) {
    this.log(message, "CRITICAL", error);
  }
  log(message, level = "INFO", error = null) {
    if (this.webhookUrl.toUpperCase() === "DEV") return;
    if (typeof level != "string") throw Error("Valid logging level required");
    const levelUpper = level?.toUpperCase() ?? "INFO";
    let color = 0;
    if (isLogLevel(levelUpper)) {
      if (this.levels.indexOf(levelUpper) < this.levels.indexOf(this.level)) {
        return;
      } else {
        color = this.getColour(levelUpper);
      }
    }
    this.sendLog(message, levelUpper, error);
  }
  async sendLog(message, levelUpper, error) {
    let color = 0;
    if (isLogLevel(levelUpper)) {
      if (this.levels.indexOf(levelUpper) < this.levels.indexOf(this.level)) {
        return;
      } else {
        color = this.getColour(levelUpper);
      }
    }
    const timeStamp = (/* @__PURE__ */ new Date()).toISOString();
    let errorMsg = "";
    if (error instanceof Error) {
      errorMsg = `${error.stack}`;
    } else if (typeof error === "string") {
      errorMsg = `${error}`;
    } else if (error) {
      try {
        errorMsg = `${JSON.stringify(error, null, 2)}`;
      } catch {
        errorMsg = `[Unserialisable error: ${String(error)}]`;
      }
    }
    const payload = {
      "embeds": [{
        "title": `${levelUpper}`,
        "description": `${timeStamp} 
 ${message}${error ? "\n" + errorMsg : ""}`,
        "color": color
      }]
    };
    if (this.webhookUrl.toUpperCase() === "DEV_CONSOLE") {
      const output = `DiscordLog 
 --------- 
 ${levelUpper} 
 ${timeStamp} 
 ${message}${error ? "\n" + errorMsg : ""}`;
      if (levelUpper === "DEBUG") {
        console.debug(output);
      } else if (levelUpper === "INFO") {
        console.info(output);
      } else if (levelUpper === "WARNING") {
        console.warn(output);
      } else if (levelUpper === "ERROR") {
        console.error(output);
      } else if (levelUpper === "CRITICAL") {
        console.error(output);
      }
      return;
    }
    try {
      await import_axios.default.post(
        this.webhookUrl,
        payload,
        {
          headers: { "Content-Type": "application/json" },
          timeout: 1e4
        }
      );
    } catch (e) {
      console.error("Discord logging unsuccessful");
    }
  }
  getColour(level) {
    const colours = {
      DEBUG: 8421504,
      INFO: 3447003,
      WARNING: 16776960,
      ERROR: 16711680,
      CRITICAL: 10038562
    };
    return colours[level] || 0;
  }
};

// src/index.ts
var index_default = DiscordLog;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DiscordLog
});
//# sourceMappingURL=index.cjs.map