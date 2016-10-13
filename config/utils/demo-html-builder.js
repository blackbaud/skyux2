const fs = require('fs-extra');
const yfm = require('yaml-front-matter');
const marked = require('marked');

const fileSuffix = '.demo.html';

marked.setOptions({
  sanitize: false
});

function escapeAngular(s) {
  s = s.replace(/'/g, '\\\'');

  s = s
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\{/g, '{{\'{\'}}');

  return s;
}

function isDemo(requireFile) {
  return requireFile.indexOf(fileSuffix) === requireFile.length - fileSuffix.length;
}

function getYml(requireFile) {
  let mdFile = requireFile.replace(/\.html$/, '.md');
  let mdYml = yfm.loadFront(mdFile);

  return mdYml;
}

function buildHtml(requireFile, fileContents) {
  tsFileContents = fs.readFileSync(requireFile.replace(/\.html$/, '.ts')).toString();
  mdYml = getYml(requireFile);

  fileContents =
`<h1>${escapeAngular(mdYml.name)}</h1>
<section class="sky-demo-section sky-demo-content">
  ${marked(mdYml.__content)}
</section>
<section class="sky-demo-section sky-demo-example">
  <h2>Demo</h2>
  ${fileContents}
</section>
<section class="sky-demo-section sky-demo-code">
  <h2>Code</h2>
  <sky-tabset>
    <sky-tab tabHeading="HTML" active="true">
      <pre><code>${escapeAngular(fileContents)}</code></pre>
    </sky-tab>
    <sky-tab tabHeading="TypeScript">
      <pre><code>${escapeAngular(tsFileContents)}</code></pre>
    </sky-tab>
  </sky-tabset>
</section>`;

  return fileContents;
}

module.exports = {
  isDemo: isDemo,
  buildHtml: buildHtml
};
