const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/presets');
mongoose.Promise = global.Promise;

var Preset = require('./preset');
var User = require('./user');
var ObjectID = require('mongodb').ObjectID;

module.exports.findAll = function (callback) {
    Preset.find({}, function (err, result) {
        if (err) throw err;
        callback(result);
    });
}

module.exports.findPresetList = function (page, perPage, callback) {
    Preset
        .find()
        .limit(perPage)
        .skip(perPage * (page - 1))
        .sort({ name: 'asc' })
        .exec(function (err, presets) {
            Preset.count().exec(function (err, count) {
                if (err) throw err;
                callback({
                    presets: presets,
                    total: count
                });
            })
        });
}

module.exports.findPresetsByEmail = function (email) {
    return Preset.find({ 'email': email }).exec();
}

module.exports.createPreset = function (
    name, description, technology, email, audioFileId, presetId) {
    var presetInstance = new Preset();
    presetInstance.name = name;
    presetInstance.description = description;
    presetInstance.technology = technology;
    presetInstance.email = email;
    presetInstance.audioFileId = audioFileId;
    presetInstance._id = new ObjectID();
    presetInstance.presetId = presetId;
    return presetInstance.save();
}

module.exports.deletePreset = function (id) {
    var presetInstance = new Preset();
    presetInstance._id = id;
    return presetInstance.remove();
}

module.exports.findUser = function (email) {
    var query = User.findOne({ email: email });
    return query.exec();
}

module.exports.saveUser = function (oauthID, email, name) {
    user = new User({
        oauthID: oauthID,
        email: email,
        name: name,
        created: Date.now()
    });
    return user.save();
}


