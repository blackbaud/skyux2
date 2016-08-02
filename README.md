# SKY UX 2

An alpha version of SKY UX 2 built on Angular 2 is now available.  It can be installed via NPM (we recommend NPM version 3 for its flat dependency structure):

`npm install blackbaud-skyux2`

We're still working on documentation, but we do have rudimentary examples available in the SKY UX 2 repo.  To run them, clone this repo locally, then run `npm install` followed by `npm start`.  This will serve up the examples at http://localhost:3000/{component-name}.html (e.g. http://localhost:3000/repeater.html).  If you plan on contributing SKY UX 2 you may use the NPM scripts below to test and build your feature.

## Available NPM scripts

Script      | Description
----------- | -----------
build       | Cleans the previous build, compiles the Sass, and transpiles the JavaScript.
clean       | Cleans the previous build.
clean:full  | Cleans the previous build, node_modules, and coverage reports.
lint        | Run TypeScript linter.
test        | Run unit tests and visual regression tests.
test:unit   | Run Karma unit tests.
test:visual | Run Webdriver visual regression tests.
start       | Serves the components at [http://localhost:3000](http://localhost:3000) for debugging.
start:visual| Serves the visual fixtures at [http://localhost:3000](http://localhost:3000) for debugging.
watch       | Run Karma unit tests and watch for file changes.
