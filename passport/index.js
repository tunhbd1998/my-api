const expressSession = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { UserModel } = require('../database');

const usingLocalStrategy = () => {
  passport.use(new LocalStrategy(
    function (username, password, done) {
      UserModel.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));
}

const usingJwtStrategy = () => {
  const opts = {
    secretOrKey: 'secret'
  };

  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    UserModel.findOne({ username: jwt_payload.username }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    });
  }));
}

module.exports = app => {
  app.use(expressSession({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
  app.use(passport.initialize());
  app.use(passport.session());

  usingLocalStrategy();

}

