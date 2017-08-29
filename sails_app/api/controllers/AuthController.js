/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

let passport = require('passport');
let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://" + process.env.DOMAIN + "/auth/google/callback",
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/plus.login'
    ],
    passReqToCallback: true
  },
  function (req, token, tokenSecret, profile, done) {
    Users.findOrCreate({googleId: profile.id}, {
      googleId: profile.id,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      photo: profile.photos[0].value,
      email: profile.emails[0].value
    }).then(function (user) {
      return done(null, user);
    }, function (err) {
      return done(err, null);
    });
  })
);


module.exports = {
  getLogin: passport.authenticate('google'),

  login: function (req, res, next) {
    passport.authenticate('google', function (err, user) {
      if (err) {
        return res.json(500, err);
      }
      req.session.user = user;
      return res.redirect("/");
    })(req, res, next);
  },

  logout: function (req, res) {
    req.session.destroy();
    return res.redirect('/?loggedOut=true');
  }
};

