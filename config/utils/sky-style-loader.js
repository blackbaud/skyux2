require('style-loader!../../src/scss/sky.scss');

var FontFaceObserver = require('fontfaceobserver');

var stylesAreLoaded = false;

var LOAD_TIMEOUT = 30000;

module.exports = {
  loadStyles: function (callback) {
    var openSans = new FontFaceObserver('Open Sans'),
      oswald = new FontFaceObserver('Oswald'),
      promise;

    promise = Promise.all(
      [
        openSans.load(null, LOAD_TIMEOUT),
        oswald.load(null, LOAD_TIMEOUT)
      ]
    );

    promise.then(function () {
      stylesAreLoaded = true;
    });

    return promise;
  },

  stylesAreLoaded: function () {
    return stylesAreLoaded;
  }
};
