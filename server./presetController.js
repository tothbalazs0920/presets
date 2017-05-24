var presetDao = require('./presetDao');

module.exports.getAllPresets = function (callback) {
    presetDao.findAll(callback);
}

module.exports.getPresetList = function (page, perPage, callback) {
    presetDao.findPresetList(page, perPage, callback);
}

module.exports.getPresetsByEmail = function (email) {
    return presetDao.findPresetsByEmail(email)
        .then(
        presets => {
            return presets;
        }
        ).catch(
        err => console.log(err)
        );
}

module.exports.createPreset = function (name, description, technology, email, audioFileId, presetId) {
    return presetDao.createPreset(name, description, technology, email, audioFileId, presetId)
        .then(
        result => {
            return result;
        }
        ).catch(
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
