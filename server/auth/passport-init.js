const config = require('../config')
const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy


passport.serializeUser(function(user, done) {
  done(null, user);
})

passport.deserializeUser(function(obj, done) {
  done(null, obj);
})

passport.use(new GitHubStrategy({
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    // callbackURL: "https://mentor-score-board.herokuapp.com/auth/callback"
    callbackURL: "http://localhost:8080/auth/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
))

module.exports = passport;