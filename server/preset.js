var mongoose = require('mongoose');
var mongoosastic=require("mongoosastic");
var Schema = mongoose.Schema;
// var ObjectId = mongoose.Types.ObjectId;

var presetSchema = new Schema({
 // _id: ObjectId,
  name: { type:String, es_indexed:true },
  technology: { type:String, es_indexed:true },
  soundcloudUrl: String,
  description: { type:String, es_indexed:true },
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

presetSchema.plugin(mongoosastic,{
  //host: 'localhost:9200',
  auth: 'elastic:changeme'
});

var Preset = mongoose.model('Presets', presetSchema);

Preset.createMapping(function(err, mapping){
  if(err){
    console.log('error creating mapping (you can safely ignore this)');
    console.log(err);
  }else{
    console.log('mapping created!');
    console.log(mapping);
  }
});

module.exports = Preset;
