require('dotenv').config()
const express = require('express')
const serverless = require('serverless-http')
const passport = require('passport')
const SteamStrategy = require('passport-steam')

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
  new SteamStrategy(
    {
      returnURL: `${process.env.BASE_URL}/auth/steam/return`,
      realm: `${process.env.BASE_URL}`,
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

const app = express() // You can also use Express
  app
  .use((req, res, next) => {
    console.log('something')
    next()
  })
  .use(passport.initialize())
  .use(passport.session())
  .get("/api/auth",(req, res, next) => {console.log('hellow!'); next()}, passport.authenticate("steam", { failureRedirect: "/" }, (err) => {
    console.log('test')
    console.log(err)
  }))
  .get(
    "/auth/steam/return",
    (req, res, next) => {console.log('hello back!'); next()},
    passport.authenticate("steam", { failureRedirect: "/" }),
    (err, req, res) => {
      console.log('test test')
      console.log(err)
      const steamId = res.req.user.id;
      console.log("yes yes?!")
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
  // .get(`/auth/steam/return`, passport.authenticate("steam", { failureRedirect: "/" }, (req, res) => {
  //   const steamId = res.req.user.id;
  //   console.log(steamId)
  // }))

module.exports.handler = serverless(app);