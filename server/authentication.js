var GoogleStrategy = require('passport-google-oauth2').Strategy;
const GOOGLE_CLIENT_ID = '23775553991-lbdkrcjvuki43tm56ofsv54ib0fnros6.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'Sw5gtgBAmRnKmnzH2fNj_35g';
const passport = require('passport');
const jwt = require('jsonwebtoken');
const passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'tasmanianDevil';

var userController = require("./userController");

passport.serializeUser(function serialize(user, done) {
    done(null, user);
});

passport.deserializeUser(function deserialize(obj, done) {
    done(null, obj);
});

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3001/auth/google/callback'
},
    function (request, accessToken, refreshToken, profile, done) {
        return userController.getUser(profile.email)
            .then(function (user) {
                if (user !== null) {
                    done(null, user);
                    return;
                } else {
                    return userController.saveUser(profile.id, profile.email, profile.displayName);
                }
            })
            .then(function (result) {
                if (result) {
                    console.log("saving user ...");
                    done(null, result);
                }
            });
    }));

var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    userController.getUser(jwt_payload.email)
        .then(
        user => {
            if (user) {
                next(null, user);
            } else {
                console.log('Email not found');
                next(null, false);
            }
        });
});
passport.use(strategy);

module.exports.getPassport = function () {
    return passport;
}