import sirv from "sirv";
import express from "express";
import compression from "compression";
import * as sapper from "@sapper/server";
import cors from "cors";
import { json } from "body-parser";
import session from "express-session";
import passport from "passport";
import SteamStrategy from "passport-steam";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Steam profile is serialized
//   and deserialized.
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
  new SteamStrategy(
    {
      returnURL: "http://localhost:3000/auth/steam/return",
      realm: "http://localhost:3000/",
      apiKey: "2F15898C280E0CD2F2D007CEB140476E",
    },
    function (identifier, profile, done) {
      // User.findByOpenID({ openId: identifier }, function (err, user) {
      //   return done(err, user);
      // });

      process.nextTick(function () {
        // To keep the example simple, the user's Steam profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the Steam account with a user record in your database,
        // and return that user instead.
        profile.identifier = identifier;
        return done(null, profile);
      });
    }
  )
);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

express() // You can also use Express
  .use(
    session({
      secret: "your secret",
      name: "name of session id",
      resave: true,
      saveUninitialized: true,
    })
  )
  .use(passport.initialize())
  .use(passport.session())
  .get("/auth/login", passport.authenticate("steam", { failureRedirect: "/" }))
  .get(
    "/auth/steam/return",
    passport.authenticate("steam", { failureRedirect: "/" }),
    function (req, res) {
      console.log("-------------------------");
      console.log(res.req.user.id);
      console.log("-------------------------");
      res.redirect("/");
    }
  )
  .use(json())
  .use(
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    sapper.middleware()
  )
  .use(cors())
  .options("*", cors())

  .listen(PORT, (err) => {
    if (err) console.log("error", err);
  });
