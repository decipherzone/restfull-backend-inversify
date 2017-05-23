/**
 * Module dependencies.
 */

import * as express from "express";
import * as compression from "compression";  // compresses requests
import * as session from "express-session";
import * as bodyParser from "body-parser";
import * as morgan from "morgan";
import * as errorHandler from "errorhandler";
import * as lusca from "lusca";
import * as dotenv from "dotenv";
import * as flash from "express-flash";
import * as logger from "./utils/logger";
import * as redisConnect from "connect-redis";
import * as redis from "redis";
import expressValidator = require("express-validator");

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({path: ".env"});

/**
 * API keys and Passport configuration.
 */
import * as passportConfig from "./config/passport";
import {IOC} from "./config/ioc";
import {InversifyExpressServer} from "inversify-express-utils";

/**
 * Create Express server.
 */
const app = express();

const RedisStore = redisConnect(session);
const redisClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);

/**
 * Express configuration.
 */
app.use(compression());
app.use(morgan("combined", {"stream": logger.stream}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    store: new RedisStore({client: redisClient})
}));
// app.use(passport.initialize());
// app.use(passport.session());
app.use(flash());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});


/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

/**
 * Start Express server.
 */

const server = new InversifyExpressServer(IOC.getInstance().container, undefined, undefined, app);
// logger.logger.error(process.env.APP_PORT);
server.build().listen(process.env.APP_PORT, process.env.APP_HOST, () => {
    console.log((" App is running at http://%s:%d in %s mode"), process.env.APP_HOST, process.env.APP_PORT, process.env.APP_MODE);
    console.log("  Press CTRL-C to stop\n");
});

module.exports = app;