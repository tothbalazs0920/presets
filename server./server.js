'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
const path = require('path');
// const multer = require('multer');
const fs = require('fs');
//auth
/*
mongoose.connect('mongodb://localhost/presets');
var conn = mongoose.connection;
var GridFsStorage = require('multer-gridfs-storage');
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
var gfs = Grid(conn.db);

var Preset = require('./preset');
var User = require('./user');
*/
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

var routes = require("./routes");
routes(app);



/*
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

*/

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



/*

// Setting up storage using multer-gridfs-storage
var storage = GridFsStorage({
  gfs: gfs,
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    cb(null, new ObjectID() + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
  },
  // With gridfs we can store aditional meta-data along with the file 
  metadata: function (req, file, cb) {
    cb(null, { originalname: file.originalname });
  },
  root: 'audio' //root name for collection to store files into
});

var upload = multer({ //multer settings
  storage: storage
}).single('file');

// API path that will upload the files 
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

  // First check if file exists
  gfs.files.find({ filename: req.params.filename }).toArray(function (err, files) {
    if (!files || files.length === 0) {
      return res.status(404).json({
        responseCode: 1,
        responseMessage: "error"
      });
    }
    // create read stream 
    var readstream = gfs.createReadStream({
      filename: files[0].filename,
      root: "audio"
    });
    // set the proper content type
    res.set('Content-Type', files[0].contentType)
    return readstream.pipe(res);
  });
});

//binary presets
// Setting up storage using multer-gridfs-storage
var presetStorage = GridFsStorage({
  gfs: gfs,
  filename: function (req, presetFile, cb) {
    console.log('presetfile in GridFsStorage: ', presetFile);
    var datetimestamp = Date.now();
    cb(null, new ObjectID() + '.' + presetFile.originalname.split('.')[presetFile.originalname.split('.').length - 1]);
  },
  // With gridfs we can store aditional meta-data along with the file
  metadata: function (req, presetFile, cb) {
    cb(null, { originalname: presetFile.originalname });
  },
  root: 'presetFile' //root name for collection to store files into
});

var presetUpload = multer({ //multer settings
  storage: presetStorage
}).single('presetFile');

// API path that will upload the files
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

  // First check if file exists 
  gfs.files.find({ filename: req.params.filename }).toArray(function (err, files) {
    if (!files || files.length === 0) {
      return res.status(404).json({
        responseCode: 1,
        responseMessage: "error"
      });
    }
   
    var readstream = gfs.createReadStream({
      filename: files[0].filename,
      root: "presetFile"
    });
   
    res.set('Content-Type', files[0].contentType)
   
    return readstream.pipe(res);
  });
});
*/
app.listen(3001);
console.log('Listening on localhost:3001');
