'use strict';

const express = require('express');
const app = express();
const jwt = require('express-jwt');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

mongoose.connect('mongodb://localhost/presets');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, 'dist')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, Authorization, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});


//const authCheck = jwt({
//  secret: 'YOUR-AUTH0-CLIENT-SECRET',
//  audience: 'YOUR-AUTH0-CLIENT-ID'
//});
const authCheck = jwt({
  secret: 'xWpmkoAEdkPyBJTH5Y3_PvG79N6WKXzfbN-rN_h0wlWQDwAfZCakfVN8SyWZmh4K',
  audience: 'IZ3GZtcNIwZZHEXtzroj5rprgJWm053V'
});


var Preset = require('./preset');
var User = require('./user');

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

app.post('/api/preset', (req, res) => {
  console.log(req.body.email);
  var presetInstance = new Preset();
  presetInstance.name = req.body.name;
  presetInstance.description = req.body.description;
  presetInstance.technology = req.body.technology;
  presetInstance.email = req.body.email;

  presetInstance.save(function (err) {
    if (err) {
      res.status(500).send();
    }
    res.status(204).send();
  });
});

app.get('/api/preset/user/:userid', authCheck, (req, res) => {
  Preset.find({ 'email': req.params.userid }, function (err, presets) {
    if (err) {
      throw err;
    }
    res.json(presets);
  });
});

var storage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    var objectId = new ObjectID();
    cb(null, objectId + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
  }
});

var upload = multer({ //multer settings
  storage: storage
}).single('file');

/** API path that will upload the files */
app.post('/api/upload', function (req, res) {
  upload(req, res, function (err) {
    console.log(req.file);
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

app.listen(3001);
console.log('Listening on localhost:3001');
