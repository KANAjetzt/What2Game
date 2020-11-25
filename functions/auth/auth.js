require("dotenv").config();
const express = require("express");
const serverless = require("serverless-http");
const passport = require("passport");
const SteamStrategy = require("passport-steam");

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
  new SteamStrategy(
    {
      returnURL: `${process.env.BASE_URL}api/auth/steam/return`,
      realm: `${process.env.BASE_URL}`,
      apiKey: `${process.env.STEAM_API_KEY}`,
    },
    function (identifier, profile, done) {
      process.nextTick(function () {
        profile.identifier = identifier;
        return done(null, profile);
      });
    }
  )
);

const app = express(); // You can also use Express
app
  .use((req, res, next) => {
    console.log("--- using auth function ---");
    next();
  })
  .use(passport.initialize())
  .use(passport.session())
  .get(
    "/api/auth",
    (req, res, next) => {
      console.log("authing");
      next();
    },
    passport.authenticate("steam", { failureRedirect: "/" })
  )
  .get(
    "/api/auth/steam/return",
    (req, res, next) => {
      console.log("returning");
      next();
    },
    passport.authenticate("steam", { failureRedirect: "/" }),
    (req, res) => {
      const steamId = res.req.user.id;
      res.redirect(`/?steamID=${steamId}`);
    }
  );

module.exports.handler = serverless(app);
