'use strict';

const express = require('express');
const app = express();
const jwt = require('express-jwt');
const cors = require('cors');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var ceil = require( 'math-ceil' );

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, 'dist')));
app.use(cors());


//const authCheck = jwt({
//  secret: 'YOUR-AUTH0-CLIENT-SECRET',
//  audience: 'YOUR-AUTH0-CLIENT-ID'
//});
const authCheck = jwt({
  secret: 'xWpmkoAEdkPyBJTH5Y3_PvG79N6WKXzfbN-rN_h0wlWQDwAfZCakfVN8SyWZmh4K',
  audience: 'IZ3GZtcNIwZZHEXtzroj5rprgJWm053V'
});

mongoose.connect('mongodb://localhost/presets');
var Preset = require('./preset');
var User = require('./user');

app.get('/api/presets', (req, res) => {
  Preset.find({}, function (err, presets) {
    if (err) {
      throw err;
    }
    res.json(presets);
  });
})

app.get('/api/presetList', (req, res) => {
  var perPage = 6;
  var page = req.query.page > 0 ? req.query.page : 0
  
  Preset
    .find()
    .limit(perPage)
    .skip(perPage * (page - 1) )
    .sort({ name: 'asc' })
    .exec(function (err, presets) {
      Preset.count().exec(function (err, count) {
        res.json({
          presets: presets,
          page: page,
          total: count
        });
      })
    })
})

app.post('/api/user', (req, res) => {
  User.findOne({ 'email': req.body.email }, function (err, found) {
    if (err) {
      throw err;
    }
    console.log(found);
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
})

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
})

app.get('/api/preset/user/:userid', authCheck, (req, res) => {
  Preset.find({ 'email': req.params.userid }, function (err, presets) {
    if (err) {
      throw err;
    }
    res.json(presets);
  });
})

app.listen(3001);
console.log('Listening on localhost:3001');
