#Contributing

We highly encourage contributions from all SKY UX 2 users. We just ask you to follow the coding conventions in the existing code and to write the appropriate documentation and unit tests for your feature.

For more information about working with SKY UX 2, see the [SKY UX 2 README](https://github.com/blackbaud/skyux2/blob/master/README.md).

### Prerequisites
Before you can contribute to SKY UX 2, you must have the following prerequisites installed on your computer:
- [Git](https://git-scm.com/)
- [Node.js (version 6+)](https://nodejs.org/en/)

## Before you start

Before you begin your contribution to SKY UX 2, please consider these general guidelines so that your contribution can be reviewed and accepted in a timely fashion.  Failure to follow these guidelines will result in your contribution not being accepted until they are addressed.

- All new code must have 100% unit test code coverage.  While 100% code coverage doesn't guarantee every use case has been accounted for, anything less that 100% does guarantee that at least one use case has not been accounted for.
- New components or visual changes to existing components must be accompanied by visual regression tests. This ensures future changes to CSS or markup will not cause components to render in an unexpected manner.  
- Documentation along with a working demo must be included.  While grammatical errors and other inconsistencies will not necessarily cause your contribution to be rejected (we can clean it up for you), your documentation should be extensive enough to explain the features of your component.  The demo should also include most or all of the features available to the component.
- If you are making a large change consisting of multiple components, please submit your changes in several small pull requests rather than one large pull request (large being more than 50 files).  We ask that you do so for the following reasons:
    - It allows the SKY UX team to review your code in manageable pieces.  It's much easier to review 50 files in 3 pull requests than 150 files in 1 pull request.
    - It allows you to get feedback sooner.  In the case where you need to make pervasive coding style changes, for example, catching that in a small code review lets you update the rest of your code that may need the same changes before you submit it.
    - It demonstrates that your code is modular and does not contain excessive interdependencies.  For instance, if you have Component B that is a child component of Component A, you should be able to author, test, document, review and release Component B in the absence of Component A.  If your changes must include both Component A and Component B to be tested and reviewed then it raises a red flag that these components may be too tightly coupled and should be refactored.

## Making your changes

### Getting the code

1. [Fork the master branch](https://help.github.com/articles/fork-a-repo/) into your own GitHub repo.
2. Create a branch named after the feature you will be contributing.  The name of your branch should be kebab-case (.e.g. my-new-feature).
3. Clone your repo locally, then run `npm install` from your local repo's directory to install all required dependencies.
4. Run your first round of visual regression tests by following the instructions in the [Writing visual regression tests](#writing-visual-regression-tests) section below.  This will establish baseline screenshots of the components in the master repo so that as you make changes and run your visual regression tests your changes will be validated against the state of the repo before your changes were made.

### Writing the code

1. Launch a command prompt, `cd` to the folder where you cloned your branch, then run `npm run watch`.
2. Launch a second command prompt, ensure the current working directory is the folder where you cloned your branch, then run `sky-pages serve`.  This will launch the SKY UX 2 documentation where you can write demo components to test out your code.  
    - SKY UX 2 documentation is authored using [SKY Pages](https://github.com/blackbaud/sky-pages-cli). If this is your first time using SKY Pages, you must install the CLI as a global NPM package before running the `sky-pages serve` command:

```sh
$ npm install sky-pages-cli -g
```
  
3. As you make changes to your code, the code will be compiled, static code analysis will be performed, unit tests will run and the documentation page will refresh with your latest changes.  

### Writing documentation

The SKY UX 2 component documentation is located in the `src/app/components` folder.  Each subfolder represents one component, and in each of these subfolders is an `index.html` file containing the documentation text as well as one or more demo components.  When documentation is built, the documentation text, demo, and the source code for the demo will be displayed on the component's documentation page.  To write documentation for a new component, follow the same pattern as the existing components' documentation.  

### Writing unit tests

Your unit test files should end in `.spec.ts` and reside in the same folder as the component it tests.  For example, if you have a `foo/foo.component.ts` file then your test file would be `foo/foo.component.spec.ts`.  All test fixtures (sample components, mock services, etc.) should be located in a folder called `fixtures` within your component's folder.  The existing codebase contains many examples of this pattern, so just follow the patterns in the existing code when writing tests for new components.

As your tests run, code coverage results are generated and can be located under `coverage/<browser version>/index.html`.  You can launch this straight from disk and view the SKY UX 2 unit test code coverage results in your default web browser. 

### Writing visual regression tests

During our continuous integration builds, we run visual regression tests through BrowserStack using [webdriverio](http://webdriver.io/) and [wdio-visual-regression-service](https://github.com/zinserjan/wdio-visual-regression-service). To run these tests locally you will need [GraphicsMagick](http://www.graphicsmagick.org/) for image processing installed on your system.

##### Mac OS X using [Homebrew](http://mxcl.github.io/homebrew/)
```sh
$ brew install graphicsmagick
```

##### Ubuntu using apt-get
```sh
$ sudo apt-get install graphicsmagick
```

##### Windows

Download and install executables for [GraphicsMagick](http://www.graphicsmagick.org/download.html).
Please make sure you install the right binaries desired for your system (32bit vs 64bit).

After installing these prerequisites you can run the visual regression tests using `npm run test:visual`, which will create and compare screenshots in the `webdriver-screenshotslocal` folder.

### Submitting the code

1. Commit and push your changes to your repo
2. Submit a pull request

### Available NPM scripts

`npm install` and `npm start` are special commands.  All other commands listed below should use the `npm run COMMAND` format.  For example, `npm run build`.

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


## Recommended tools

### Visual Studio Code setup

Like Angular 2, SKY UX 2 is written in [TypeScript](https://www.typescriptlang.org/), and the free [Visual Studio Code editor](https://code.visualstudio.com/) is one of the best options for working with TypeScript.  It supports code navigation, refactoring tools, and a host of other features that are usually only found in richer IDEs.  The SKY UX team uses Visual Studio Code and has some recommendations for configuring it to work best with Angular 2 and SKY UX 2. Even if you do not want to use Visual Studio Code as your editor, some of the following information will still be useful as many of the extensions and other tips are available for other popular editors such as [Atom](https://atom.io/), [Brackets](http://brackets.io/) and [Sublime Text](https://www.sublimetext.com/).

#### Visual Studio Code extensions

The following VS Code extensions are highly recommended:

- [TSLint](https://marketplace.visualstudio.com/items?itemName=eg2.tslint): This extension will validate your TypeScript code against the rules specified in the `tslint.json` file in the SKY UX repo.  TSLint will be run during the CI build, so if your code does not validate in VS Code with the use of this extension, the CI build will fail.

- [EditorConfig](https://github.com/editorconfig/editorconfig-vscode): This extension allows VS Code to recognize this project's [`.editorconfig`](http://editorconfig.org/) file so that many of the coding conventions used by the SKY UX team can be automatically enforced, such as indent size, trailing whitespace rules, etc.  If you do not use this extension then you will find yourself fixing a lot of TSLint errors manually instead of letting VS Code do it for you.
