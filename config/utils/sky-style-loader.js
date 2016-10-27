require('style-loader!../../src/scss/sky.scss');

var FontFaceObserver = require('fontfaceobserver');

var stylesAreLoaded = false;

var LOAD_TIMEOUT = 30000;

module.exports = {
  loadStyles: function (callback) {
    var fontAwesome = new FontFaceObserver('FontAwesome'),
      openSans = new FontFaceObserver('Open Sans'),
      oswald = new FontFaceObserver('Oswald'),
      promise;

    promise = Promise.all(
      [
        // Specify a character for FontAwesome since some browsers will fail to detect
        // when the font is loaded unless a known character with a different width
        // than the default is not specified.
        fontAwesome.load('\uf0fc', LOAD_TIMEOUT),
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
