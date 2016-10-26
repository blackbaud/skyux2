require('style-loader!../../src/scss/sky.scss');

var FontFaceObserver = require('fontfaceobserver');

var stylesAreLoaded = false;

module.exports = {
  loadStyles: function (callback) {
    var fontAwesome = new FontFaceObserver('FontAwesome'),
      openSans = new FontFaceObserver('Open Sans'),
      oswald = new FontFaceObserver('Oswald'),
      promise;

    promise = Promise.all(
      [
        fontAwesome.load(),
        openSans.load(),
        oswald.load()
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
