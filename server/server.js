'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
var ObjectID = require('mongodb').ObjectID;

//auth
var GoogleStrategy = require('passport-google-oauth2').Strategy;
const GOOGLE_CLIENT_ID = '23775553991-lbdkrcjvuki43tm56ofsv54ib0fnros6.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'Sw5gtgBAmRnKmnzH2fNj_35g';
const passport = require('passport');
const jwt = require('jsonwebtoken');
const passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'tasmanianDevil';
//auth

mongoose.connect('mongodb://localhost/presets');
var conn = mongoose.connection;
var GridFsStorage = require('multer-gridfs-storage');
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
var gfs = Grid(conn.db);

var Preset = require('./preset');
var User = require('./user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, 'dist')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, Authorization, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
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
    User.findOne({ email: profile.email }, function (err, user) {
      if (err) {
        console.log(err);  // handle errors!
      }
      if (!err && user !== null) {
        done(null, user);
      } else {
        user = new User({
          oauthID: profile.id,
          email: profile.email,
          name: profile.displayName,
          created: Date.now()
        });
        user.save(function (err) {
          if (err) {
            console.log(err);  // handle errors!
          } else {
            console.log("saving user ...");
            done(null, user);
          }
        });
      }
    });
  }
));

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
  User.findOne({ 'email': jwt_payload.email }, function (err, user) {
    if (err) {
      console.log(err);
      throw err;
    }
    if (user) {
      next(null, user);
    } else {
      console.log('Email not found');
      next(null, false);
    }
  });
});

passport.use(strategy);

// parse application/json
app.use(bodyParser.json())

app.get("/secret", passport.authenticate('jwt', { session: false }), function (req, res) {
  res.json({ message: "Success! You can not see this without a token " + req.user });
});

app.get('/api/presets', (req, res) => {
  Preset.find({}, function (err, presets) {
    if (err) {
      throw err;
    }
    res.json(presets);
  });
});

app.get('/api/presetList', (req, res) => {
  var perPage = 6;
  var page = req.query.page > 0 ? req.query.page : 0

  Preset
    .find()
    .limit(perPage)
    .skip(perPage * (page - 1))
    .sort({ name: 'asc' })
    .exec(function (err, presets) {
      Preset.count().exec(function (err, count) {
        res.json({
          presets: presets,
          total: count
        });
      })
    })
});

app.post('/api/user', (req, res) => {
  User.findOne({ 'email': req.body.email }, function (err, found) {
    if (err) {
      throw err;
    }
    if (found) {
      res.status(204).send();
      return;
    } else {
      var userInstance = new User();
      userInstance.email = req.body.email;
      userInstance.user_id = req.body.user_id;
      userInstance.name = req.body.name;
      userInstance.picture = req.body.picture;
      userInstance.given_name = req.body.given_name;
      userInstance.family_name = req.body.family_name;
      userInstance.nickname = req.body.nickname;

      userInstance.save(function (err) {
        if (err) {
          res.status(500).send();
        }
        res.status(204).send();
      });
    }
  });
});

app.post('/api/preset', passport.authenticate('jwt', { session: false }), (req, res) => {
  var presetInstance = new Preset();
  presetInstance.name = req.body.name;
  presetInstance.description = req.body.description;
  presetInstance.technology = req.body.technology;
  presetInstance.email = req.user.email;
  presetInstance.audioFileId = req.body.audioFileId;
  presetInstance._id = new ObjectID();
  presetInstance.presetId = req.body.presetId;

  presetInstance.save(function (err) {
    if (err) {
      console.log('error:', err);
      res.status(500).send();
      return;
    }
    res.status(204).send();
  });
});

/*
app.put('/api/preset', passport.authenticate('jwt', { session: false }), (req, res) => {
  var presetInstance = new Preset();
  presetInstance.name = req.body.name;
  presetInstance.description = req.body.description;
  presetInstance.technology = req.body.technology;
  presetInstance.email = req.user.email;
  presetInstance.audioFileId = req.body.audioFileId;
  presetInstance._id = req.body._id;

  presetInstance.update(function (err) {
    if (err) {
      console.log('error:', err);
      res.status(500).send();
      return;
    }
    res.status(204).send();
  });
});

app.get('/api/preset/:id', (req, res) => {
  Preset.findOne({ '_id': req.body._id }, function (err, preset) {
    if (err) {
      throw err;
    }
    res.json(preset);
  });
});
*/

app.delete('/api/preset/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  console.log('req.params.id: ', req.params.id);
  var presetInstance = new Preset();
  presetInstance._id = req.params.id;

  presetInstance.remove(function (err) {
    if (err) {
      console.log('error:', err);
      res.status(500).send();
      return;
    }
    res.status(204).send();
  });
});

app.get('/api/preset/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
  Preset.find({ 'email': req.user.email }, function (err, presets) {
    if (err) {
      throw err;
    }
    res.json(presets);
  });
});

/** Setting up storage using multer-gridfs-storage */
var storage = GridFsStorage({
  gfs: gfs,
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    cb(null, new ObjectID() + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
  },
  /** With gridfs we can store aditional meta-data along with the file */
  metadata: function (req, file, cb) {
    cb(null, { originalname: file.originalname });
  },
  root: 'audio' //root name for collection to store files into
});

var upload = multer({ //multer settings
  storage: storage
}).single('file');

/** API path that will upload the files */
app.post('/api/upload', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      res.json({ error_code: 1, err_desc: err });
      return;
    }
    res.json({
      error_code: 0,
      err_desc: null,
      filename: req.file.filename,
      originalname: req.file.originalname
    });
  });
});

app.get('/api/audio/:filename', function (req, res) {
  gfs.collection('audio'); //set collection name to lookup into

  /** First check if file exists */
  gfs.files.find({ filename: req.params.filename }).toArray(function (err, files) {
    if (!files || files.length === 0) {
      return res.status(404).json({
        responseCode: 1,
        responseMessage: "error"
      });
    }
    /** create read stream */
    var readstream = gfs.createReadStream({
      filename: files[0].filename,
      root: "audio"
    });
    /** set the proper content type */
    res.set('Content-Type', files[0].contentType)
    /** return response */
    return readstream.pipe(res);
  });
});

//binary presets
/** Setting up storage using multer-gridfs-storage */
var presetStorage = GridFsStorage({
  gfs: gfs,
  filename: function (req, presetFile, cb) {
    console.log('presetfile in GridFsStorage: ', presetFile);
    var datetimestamp = Date.now();
    cb(null, new ObjectID() + '.' + presetFile.originalname.split('.')[presetFile.originalname.split('.').length - 1]);
  },
  /** With gridfs we can store aditional meta-data along with the file */
  metadata: function (req, presetFile, cb) {
    cb(null, { originalname: presetFile.originalname });
  },
  root: 'presetFile' //root name for collection to store files into
});

var presetUpload = multer({ //multer settings
  storage: presetStorage
}).single('presetFile');

/** API path that will upload the files */
app.post('/api/presetfile/upload', function (req, res) {
  presetUpload(req, res, function (err) {
    console.log('filee: ',req.file.filename);
    if (err) {
      console.log(err);
      res.json({ error_code: 1, err_desc: err });
      return;
    }
    res.json({
      error_code: 0,
      err_desc: null,
      filename: req.file.filename,
      originalname: req.file.originalname
    });
  });
});

app.get('/api/presetfile/:filename', function (req, res) {
  console.log('filename');
  console.log('filename', req.params.filename);
  gfs.collection('presetFile'); //set collection name to lookup into

  /** First check if file exists */
  gfs.files.find({ filename: req.params.filename }).toArray(function (err, files) {
    if (!files || files.length === 0) {
      return res.status(404).json({
        responseCode: 1,
        responseMessage: "error"
      });
    }
    /** create read stream */
    var readstream = gfs.createReadStream({
      filename: files[0].filename,
      root: "presetFile"
    });
    /** set the proper content type */
    res.set('Content-Type', files[0].contentType)
    /** return response */
    return readstream.pipe(res);
  });
});

app.listen(3001);
console.log('Listening on localhost:3001');
