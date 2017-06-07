var presetDao = require('./presetDao');
var Preset = require('./preset');
var mongoose = require('mongoose');

module.exports.getAllPresets = function (callback) {
    presetDao.findAll(callback);
}

module.exports.getPresetList = function (page, perPage, callback) {
    presetDao.findPresetList(page, perPage, callback);
}

module.exports.getPresetsById = function (id) {
    return presetDao.findPresetsById(id)
        .then(
        preset => {
            return preset;
        }
        ).catch(
        err => console.log(err)
        );
}

module.exports.getPresetsByEmail = function (email) {
    return presetDao.findPresetsByEmail(email)
        .then(
        presets => {
            return presets;
        }).catch(
        err => console.log(err)
        );
}

var populatePreset = function (
    preset, id, name, description, technology, email, presetAuthor, profilePicture, audioFileId, presetId) {
    preset.name = name;
    preset.description = description;
    preset.technology = technology;
    preset.email = email;
    preset.presetAuthor = presetAuthor;
    preset.profilePicture = profilePicture;
    preset.audioFileId = audioFileId;
    preset._id = mongoose.Types.ObjectId(id);
    preset.presetId = presetId;
    return preset;
}

module.exports.updatePreset = function (id, name, description, technology, email, presetAuthor, profilePicture, audioFileId, presetId) {
    var presetInstance = new Preset();
    return presetDao.findPresetsById(id)
        .then(
        result => {
            if (result) {
                presetInstance = result;
            }
            presetInstance = populatePreset(presetInstance, id, name, description, technology, email, presetAuthor, profilePicture, audioFileId, presetId);
            return presetDao.savePreset(presetInstance);
        }).then(
        result => {
            return result;
        }).catch(
        err => console.log(err)
        );
}

module.exports.deletePreset = function (id) {
    return presetDao.deletePreset(id)
        .then(
        result => {
            return result;
        }
        ).catch(
        err => console.log(err)
        );
}

/*
module.exports.searchPresets = function (terms) {
    return presetDao.searchPresets(terms)
        .then(
        presets => {
            return presets;
        }).catch(
        err => console.log(err)
        );
}
*/