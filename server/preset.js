var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var ObjectId = mongoose.Types.ObjectId;

var presetSchema = new Schema({
 // _id: ObjectId,
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
  presetId: String,
  img: String,
  price: Number,
  currency: String,
  audioFileId: String,
  email: String
});

var Preset = mongoose.model('Presets', presetSchema);

module.exports = Preset;