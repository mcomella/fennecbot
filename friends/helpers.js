var fs = require('fs'),
    Promise = require('promise');

var readFile = Promise.denodeify(fs.readFile);

var configCache = {}; // map from filename to json parsed data in file.

function clearCache() {
  configCache = {};
}
exports._clearCache = clearCache; // Only intended for testing use.

/**
 * Returns a Promise which will resolve to a random helper from
 * the given file path, filtered by time (i.e. helper availability).
 *
 * This method caches results from disk so don't be concerned about
 * calling it often.
 */
function getRandom(configPath, time) {
  return getDataForConfig(configPath).then((data) => {
    return getRandomFromData(data, time);
  });
}
exports.getRandom = getRandom;

function getDataForConfig(configPath) {
  if (configCache[configPath]) {
    return new Promise((fulfill, reject) => {
      fulfill(configCache[configPath]);
    });
  }

  return readFile(configPath, 'UTF-8').then(JSON.parse).then((data) => {
    configCache[configPath] = data;
    return data;
  });
}

function getRandomFromData(data, time) {
  // TODO: Filter on time (need to construct format).
  // TODO: How to return no-one found?
  var index = getRandomInt(0, data.length);
  return data[index];
}

/**
 * Returns a random integer between min (included) and max (excluded)
 * Using Math.round() will give you a non-uniform distribution!
 *
 * via http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random/
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
