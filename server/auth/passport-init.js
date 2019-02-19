const config = require('../config')
const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy

const CLIENT_ID = '4e10c51577c249056b77'
const CLIENT_SECRET = '7b9e71521d42bba0b3095cfc31c51cea1b083529'

passport.serializeUser(function(user, done) {
  done(null, user);
})

passport.deserializeUser(function(obj, done) {
  done(null, obj);
})

passport.use(new GitHubStrategy({
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    callbackURL: "https://mentor-score-board.herokuapp.com/auth/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
))

module.exports = passport;