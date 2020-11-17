require('dotenv').config()
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

var os = require('os');

var interfaces = os.networkInterfaces();
var addresses = [];
for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            addresses.push(address.address);
        }
    }
}

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
      returnURL: `http://${addresses[0]}:${PORT}/auth/steam/return`,
      realm: `http://${addresses[0]}:${PORT}/`,
      apiKey: `${process.env.STEAM_API_KEY}`,
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

  // .get("/auth/steam/return", (req, res) => {
  //   passport.authenticate("steam", { failureRedirect: "/" });
  //   console.log("-------------------------");
  //   console.log(res.req.user.id);
  //   console.log("-------------------------");
  //   const steamId = res.req.user.id;

  //   /* Returns steamID */
  //   res.status(200).json({
  //     success: true,
  //     data: {
  //       steamId,
  //     },
  //   });
  // })

  .get(
    "/auth/steam/return",
    passport.authenticate("steam", { failureRedirect: "/" }),
    (req, res) => {
      const steamId = res.req.user.id;

      res.redirect(`/?steamID=${steamId}`);

      /* Returns steamID */
      // res.status(200).json({--
      //   success: true,
      //   data: {
      //     steamId,
      //   },
      // });
    }
  )
  .get("/", (req, res, next) => {
    if (!req.query) return;
    const steamId = req.query;
    next();
  })

  // .get(
  //   "/auth/steam/return",
  //   passport.authenticate("steam", { failureRedirect: "/" }),
  //   function (req, res) {
  //     console.log("-------------------------");
  //     console.log(res.req.user.id);
  //     console.log("-------------------------");
  //     const steamId = res.req.user.id;
  //     res.redirect("/");
  //     /* Returns the result */
  //     return res.end(JSON.stringify({ success: true, data: { steamId } }));
  //   }
  // )

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
