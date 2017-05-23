import * as passport from "passport";
import * as passportLocal from "passport-local";
import * as passportFacebook from "passport-facebook";
import * as _ from "lodash";

import {Request, Response, NextFunction} from "express";

const LocalStrategy = passportLocal.Strategy;
const FacebookStrategy = passportFacebook.Strategy;

passport.serializeUser<any, any>((user, done) => {
    done(undefined, user.id);
});

passport.deserializeUser((id, done) => {

});


/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy({usernameField: "email"}, (email, password, done) => {

}));

/**
 * Login Required middleware.
 */
export let isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};

/**
 * Authorization Required middleware.
 */
export let isAuthorized = (req: Request, res: Response, next: NextFunction) => {
    const provider = req.path.split("/").slice(-1)[0];

    if (_.find(req.user.tokens, {kind: provider})) {
        next();
    } else {
        res.redirect(`/auth/${provider}`);
    }
};