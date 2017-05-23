/**
 * Created by Raja Dushyant Vashishtha on 23/5/17.
 * email rajad@decipherzone.com
 *
 * Description : $Description$
 */

import * as winston from "winston";
import * as traceback from "traceback";

const logObject = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: "silly",
            filename: "./logs/all-logs.log",
            handleExceptions: true,
            json: true,
            maxsize: 5242880,
            maxFiles: 5,
            colorize: false
        }),
        new winston.transports.Console({
            level: "debug",
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false,
    level: "silly",
    colors: {
        silly: "blue",
        debug: "green",
        verbose: "white",
        info: "white",
        warn: "orange",
        foobar: "red"
    }
});

export let logger = {
    getTrace: function () {
        const stack = traceback.raw();
        return "[Fn:" + (stack[2].getFunctionName() || "anonymous") + "]" + stack[2].getFileName() + ":" + stack[2].getLineNumber();
    },
    silly: function (b: any) {
        logObject.log("silly", this.getTrace(), " - ", b);
    },
    debug: function (b: any) {
        logObject.log("debug", this.getTrace(), " - ", b);
    },
    verbose: function (b: any) {
        logObject.log("verbose", this.getTrace(), " - ", b);
    },
    info: function (b: any) {
        logObject.log("info", this.getTrace(), " - ", b);
    },
    warn: function (b: any) {
        logObject.log("warn", this.getTrace(), " - ", b);
    },
    error: function (b: any) {
        logObject.log("error", this.getTrace(), " - ", b);
    },
    obj: function (b: any) {
        console.log(this.getTrace(), " - ", b);
    }
};

export let stream: any = {
    write: function (message: any, encoding: any) {
        logger.info(message);
    }
};