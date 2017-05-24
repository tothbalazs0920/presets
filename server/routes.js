var presetController = require("./presetController");
var userController = require("./userController");

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

module.exports = function (app) {

    app.get('/api/presetList', function (req, res) {
        var perPage = 6;
        var page = req.query.page > 0 ? req.query.page : 0;
        presetController.getPresetList(page, perPage, function (results) { res.json(results); });
    });

    app.get('/api/preset/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
        presetController.getPresetsByEmail(req.user.email)
            .then(
            result => {
                return res.json(result);
            });
    });

    app.post('/api/preset', passport.authenticate('jwt', { session: false }), (req, res) => {
        presetController.createPreset(
            req.body.name, req.body.description, req.body.technology, req.user.email, req.body.audioFileId, req.body.presetId)
        .then(
            result => {
                return res.json(result);
            });
    });

    app.delete('/api/preset/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
        presetController.deletePreset(req.params.id)
            .then(
            result => {
                return res.json(result);
            });
    });

    app.get('/api/user/:email', function (req, res) {
        userController.getUser(req.params.email)
            .then(
            result => {
                return res.json(result);
            });
    });

    app.post('/api/user/:email', function (req, res) {
        userController.saveUser('1234', req.params.email, 'profile.displayName')
            .then(
            result => {
                return res.json(result);
            });
    });


    // config passport
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

    app.use(passport.initialize());

    app.get('/auth/google', passport.authenticate('google', {
        failureRedirect: 'http://localhost:4200/login',
        scope: [
            'https://www.googleapis.com/auth/plus.login',
            'https://www.googleapis.com/auth/plus.profile.emails.read'
        ]
    }), function (req, res) {
        res.redirect('http://localhost:4200/presets?token=' + '');
    });

    // handle google callback
    app.get('/auth/google/callback', passport.authenticate('google', {
        failureRedirect: 'http://localhost:4200/login'
    }),
        function (req, res) {
            var payload = { email: req.user.email };
            var token = jwt.sign(payload, jwtOptions.secretOrKey, { expiresIn: '1h' });
            res.redirect('http://localhost:4200/presets?pageNumber=1&searchTerm=&previouslySearchedTerm=&token=' + token);
        });

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

    app.get("/secret", passport.authenticate('jwt', { session: false }), function (req, res) {
        res.json({ message: "Success! You can not see this without a token " + req.user });
    });

}
