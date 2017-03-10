#Contributing

We highly encourage contributions from all SKY UX 2 users. We just ask you to follow the coding conventions in the existing code and to write the appropriate documentation and unit tests for your feature.

For more information about working with SKY UX 2, see the [SKY UX 2 README](https://github.com/blackbaud/skyux2/blob/master/README.md).

### Prerequisites
Before you can contribute to SKY UX 2, you must install the following prerequisites:
- [Git](https://git-scm.com/)
- [Node.js (version 6+)](https://nodejs.org/en/)

## Before you start

Before you begin to contribute to SKY UX 2, please consider these general guidelines so that your contributions can be reviewed and accepted in a timely fashion. Failure to follow these guidelines will result in your contribution not being accepted until they are addressed.

- All new code must have 100 percent unit test code coverage. This doesn't guarantee that every use case is accounted for, but anything less than 100 percent code coverage does guarantee that at least one use case is not accounted for. This can be verifyed by running tests with `npm run watch`, and seeing the code coverage results in `coverage/Chrome xx.x.xxxx/index.html`.
- New components or visual changes to existing components must be accompanied by visual regression tests. This ensures that future changes to CSS or markup will not cause components to render in an unexpected manner. Visual tests consist of three parts: an html template for the component to be tested, a typescript file for the component to be tested, and the actual file that runs the test using webdriver.io and our custom screenshot functions. You can see examples of each part of the visual test process at https://github.com/blackbaud/skyux2/blob/master/src/modules/alert/fixtures/alert.component.visual-fixture.html, https://github.com/blackbaud/skyux2/blob/master/src/modules/alert/fixtures/alert.component.visual-fixture.ts, and https://github.com/blackbaud/skyux2/blob/master/src/modules/alert/alert.component.visual-spec.js.
- Documentation and a working demo must be included. While grammatical errors and other inconsistencies will not necessarily cause your contribution to be rejected (we can clean it up for you), your documentation should be extensive enough to explain the features of your component. The demo should also include most or all of the features available to the component.
- If you are making a large change consisting of multiple components, please submit your changes in several small pull requests rather than one large pull request (large being more than 50 files).  We ask that you do so for the following reasons:
    - It allows the SKY UX team to review your code in manageable pieces. It's much easier to review 50 files in 3 pull requests than 150 files in 1 pull request.
    - It allows you to get feedback sooner. In the case where you need to make pervasive coding style changes, for example, catching that in a small code review lets you update the rest of your code that may need the same changes before you submit it.
    - It demonstrates that your code is modular and does not contain excessive interdependencies. For instance, if you have Component B that is a child component of Component A, you should be able to author, test, document, review, and release Component B in the absence of Component A. If your changes must include both Component A and Component B to be tested and reviewed, then it raises a red flag that these components may be too tightly coupled and should be refactored.
- If you are making an API change that affects inputs and outputs for a component, we recommend that you provide your potential (not working) documentation and demo to the SKY UX team for review so that we can head off any API issues before implementation. Contributors should keep in mind that the API can change in the course of development. 

## Make your changes

### Get the code

1. [Fork the master branch](https://help.github.com/articles/fork-a-repo/) into your own GitHub repo.
2. Create a branch named after the feature you will contribute. The name of your branch should be kebab-case (e.g. my-new-feature).
3. Clone your repo locally, then run `npm install` from your local repo's directory to install all required dependencies.
4. Run your first round of visual regression tests by following the instructions in the [Write visual regression tests](#writing-visual-regression-tests) section below.  This establishes baseline screenshots of the components in the master repo so that as you make changes and run your visual regression tests, your changes are validated against the state of the repo before the changes.

### Write the code

1. Launch a command prompt, `cd` to the folder where you cloned your branch, and run `npm run watch`.
2. Launch a second command prompt, ensure the current working directory is the folder where you cloned your branch, and run `sky-pages serve`. This launches the SKY UX 2 documentation where you can write demo components to test your code.  
    - SKY UX 2 documentation is authored using [SKY UX Builder](https://github.com/blackbaud/sky-pages-cli). If this is your first time using SKY UX Builder, you must install the CLI as a global NPM package before you run the `skyux serve` command:
```sh
$ npm install @blackbaud/skyux-cli -g
```
  
3. When you save changes to your code, the code compiles, static code analysis is performed, unit tests run, and the documentation page refreshes with your latest changes.  

### Write documentation

The SKY UX 2 component documentation is located in the `src/app/components` folder. Each subfolder represents one component, and each subfolder contains an `index.html` file with the documentation text and one or more demo components. When documentation builds, the documentation text, demo, and the source code for the demo are displayed on the component's documentation page. To write documentation for a new component, follow the same pattern as the existing components.  

### Write unit tests

Your unit test files should end in `.spec.ts` and reside in the same folder as the component that they test. For example, if you have a `foo/foo.component.ts` file then your test file would be `foo/foo.component.spec.ts`. All test fixtures (sample components, mock services, etc.) should be located in a folder called `fixtures` within your component's folder. The existing codebase contains many examples of this pattern, so just follow the patterns in the existing code when you write tests for new components.

As your tests run, code coverage results are generated and can be located under `coverage/<browser version>/index.html`. You can launch this straight from disk and view the SKY UX 2 unit test code coverage results in your default web browser. 

### Write visual regression tests

During our continuous integration builds, we run visual regression tests through BrowserStack using [webdriverio](http://webdriver.io/) and [wdio-visual-regression-service](https://github.com/zinserjan/wdio-visual-regression-service). To run these tests locally, you need [GraphicsMagick](http://www.graphicsmagick.org/) for image processing installed on your system.

##### Mac OS X using [Homebrew](http://mxcl.github.io/homebrew/)
```sh
$ brew install graphicsmagick
```

##### Ubuntu using apt-get
```sh
$ sudo apt-get install graphicsmagick
```

##### Windows

Download and install executables for [GraphicsMagick](http://www.graphicsmagick.org/download.html). Make sure to install the right binaries desired for your system (32bit vs 64bit).

After you install these prerequisites, you can run the visual regression tests using `npm run test:visual`, which creates and compares screenshots in the `webdriver-screenshotslocal` folder.

### Submit the code

1. Commit and push your changes to your repo.
2. Submit a pull request.

### Available NPM scripts

`npm install` and `npm start` are special commands.  All other commands listed below should use the `npm run COMMAND` format.  For example, `npm run build`.

Script      | Description
----------- | -----------
`build`       | Cleans the previous build, compiles the Sass, and transpiles the JavaScript.
`clean`       | Cleans the previous build.
`clean:full`  | Cleans the previous build, node_modules, and coverage reports.
`lint`        | Runs TypeScript linter.
`test`        | Runs unit tests and visual regression tests.
`test:unit`   | Runs Karma unit tests.
`test:visual` | Runs Webdriver visual regression tests.
`start`       | Serves the components at [http://localhost:3000](http://localhost:3000) for debugging.
`start:visual`| Serves the visual fixtures at [http://localhost:3000](http://localhost:3000) for debugging.
`watch`       | Runs Karma unit tests and watch for file changes.


## Recommended tools

### Visual Studio Code setup

Like Angular 2, SKY UX 2 is written in [TypeScript](https://www.typescriptlang.org/), and the free [Visual Studio Code editor](https://code.visualstudio.com/) is one of the best options for working with TypeScript.  It supports code navigation, refactoring tools, and a host of other features that are usually only found in richer IDEs.  The SKY UX team uses Visual Studio Code and has some recommendations for configuring it to work best with Angular 2 and SKY UX 2. Even if you do not want to use Visual Studio Code as your editor, some of the following information will still be useful as many of the extensions and other tips are available for other popular editors such as [Atom](https://atom.io/), [Brackets](http://brackets.io/), and [Sublime Text](https://www.sublimetext.com/).

#### Visual Studio Code extensions

The following VS Code extensions are highly recommended:

- [TSLint](https://marketplace.visualstudio.com/items?itemName=eg2.tslint): This extension validates your TypeScript code against the rules specified in the `tslint.json` file in the SKY UX 2 repo. TSLint runs during the CI build, so if your code does not validate in VS Code with the use of this extension, the CI build will fail.

- [EditorConfig](https://github.com/editorconfig/editorconfig-vscode): This extension allows VS Code to recognize this project's [`.editorconfig`](http://editorconfig.org/) file so that many of the coding conventions used by the SKY UX team can be enforced automatically, such as indent size, trailing whitespace rules, etc. If you do not use this extension, then you will find yourself fixing a lot of TSLint errors manually instead of letting VS Code do it for you.
