var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var presetSchema = new Schema({
  _id: String,
  name: String,
  technology: String,
  soundcloudUrl: String,
  description: String,
  genre: { type : Array , "default" : [] },
  numberOfDownLoads: Number,
  amp: { type : Array , "default" : [] },
  cabinet: { type : Array , "default" : [] },
  michrophones: { type : Array , "default" : [] },
  presetAuthor: String,
  lead: Boolean,
  clean: Boolean,
  rythm: Boolean,
  author: String,
  album: String,
  songTitle: String,
  preset: String,
  img: String,
  price: Number,
  currency: String,
  audioFileId: String,
  email: String
});

var Preset = mongoose.model('Preset', presetSchema);

module.exports = Preset;