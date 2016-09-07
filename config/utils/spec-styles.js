require('style-loader!../../src/scss/sky.scss');

// A race condition exists in Firefox where tests can begin before styles are loaded.
// This will ensure that styles are loaded before tests run by ensuring the style rule
// for the HTML hidden property defined in sky.scss has been applied.
(function () {
  var el = document.createElement('div'),
    stylesLoaded;

  el.hidden = true;
  el.style.display = 'block';

  document.body.appendChild(el);

  beforeAll(function (done) {
    if (stylesLoaded) {
      done();
    } else {
      setInterval(function () {
        if (getComputedStyle(el).display === 'none') {
          stylesLoaded = true;
          done();
        }
      }, 50);
    }
  });
}());
