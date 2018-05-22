# Contributing

We highly encourage contributions from all SKY UX users. We just ask you to follow the coding conventions in the existing code and to write the appropriate unit tests for your features.

For more information about working with SKY UX 2, see the [SKY UX README](https://github.com/blackbaud/skyux2/blob/master/README.md).

### Prerequisites
Before you contribute, you must install [the SKY UX prerequisites](https://developer.blackbaud.com/skyux/learn/get-started/prereqs/initial-setup):
- [Git](https://git-scm.com/)
- [Node.js (the latest release of version 6)](https://nodejs.org/en/download/releases/)

## Before you start

Before you contribute to SKY UX, please consider these general guidelines so that we can review and accept your contributions in a timely fashion. If you do not follow these guidelines, we cannot accept your contributions.

- **Please [file an issue](https://github.com/blackbaud/skyux2/issues/new) before you start any work. The sooner we can discuss potential code changes, the better. We can also use the issue to track and assign any work needed.**
- **Use the `Sky` prefix when naming all classes, directives, services, components, etc.** This prefix indicates to other contributors that items are owned by SKY UX and not a third-party library and also prevents potential class-name clashes with other libraries. Keep in mind that while we generally use the uppercase `Sky` prefix, we also use the `sky-` prefix in some cases, such as the selector property in components.
- **All new code must have 100 percent unit test code coverage.** This doesn't guarantee that every use case is accounted for, but anything less than 100 percent code coverage does guarantee that at least one use case is not accounted for. This can be verified by running tests with `npm run watch` and viewing the code coverage results in `coverage/Chrome xx.x.xxxx/index.html`.
- **All new components and visual changes to existing components must be accompanied by visual regression tests.** This ensures that future changes to CSS or markup will not cause components to render in an unexpected manner. Visual tests consist of three parts: an HTML template for the component to test, a TypeScript file for the component to test, and the actual file that runs the test using webdriver.io and our custom screenshot functions. You can see examples of each part of the visual test process at:
    - https://github.com/blackbaud/skyux2/blob/master/skyux-spa-visual-tests/src/app/alert/alert-visual.component.html
    - https://github.com/blackbaud/skyux2/blob/master/skyux-spa-visual-tests/src/app/alert/alert-visual.component.ts
    - https://github.com/blackbaud/skyux2/blob/master/skyux-spa-visual-tests/src/app/alert/alert.visual-spec.ts.
- **All new components and changes to existing components must have passing [accessibility tests](https://developer.blackbaud.com/skyux/learn/accessibility/test).** This includes automated tests to run during visual regression tests as well as code review and manual keyboard testing.
- **All new components must include demos to accompany the reference documentation in [the Components section of the SKY UX website](https://developer.blackbaud.com/skyux/components).** Demos must include all or most features available to the components and examples of all inputs and outputs. In [the SKY UX repo](https://github.com/blackbaud/skyux2), you create subfolders for your components in the `src/demos` folder and add TypeScript and HTML files for the demos. You create `{componentName}-demo.component.html` files to provide HTML templates for demos, `{componentName}-demo.component.ts` files to handle the logic, and `index.ts` files to export demos. For examples of existing demos, serve the [the SKY UX repo](https://github.com/blackbaud/skyux2) or view [the components documentation on the SKY UX website](https://developer.blackbaud.com/skyux/components). We recommend that you also [create the reference documentation](#write-documentation) for your components in a separate pull request in [the SKY UX docs repo](https://github.com/blackbaud/skyux2-docs). If you do not, we request that you [file an issue](https://github.com/blackbaud/skyux2/issues/new) for the SKY UX team to document your components. However, we strongly encourage you to create your own documentation because it can be useful to uncover issues with your components. 
- **For large changes that include multiple components, please submit changes in several small pull requests instead of one large pull request.** (Large being more than 50 files). We ask that you do this for the following reasons:
    - It allows the SKY UX team to review your code in manageable pieces. It's much easier to review 3 pull requests with 50 files than 1 pull request with 150 files.
    - It allows you to get feedback sooner. Catching pervasive coding style changes in a small code review allows you update the rest of your code before you submit it.
    - It demonstrates that your code is modular and does not contain excessive interdependencies. For instance, if Component B is a child component of Component A, you should be able to author, test, document, review, and release Component B in the absence of Component A. If your changes must include both Component A and Component B to be tested and reviewed, then it raises a red flag that the components may be too tightly coupled and should be refactored.
- **If you make an API change that affects inputs and outputs for a component, we recommend that you provide your potential (not working) documentation and demo to the SKY UX team for review.** This lets us head off API issues before implementation. Contributors should keep in mind that the API can change in the course of development.

## Localization

To declare localization strings, specify a string name and provide the string and a description in the `resources_en_US.json` file in `src/assets/locales`. You can reference the localization strings with the `skyAppResources` pipe or the `SkyAppResourcesService` service in `@blackbaud/skyux-builder/runtime/i18n`.

## Make your changes

### Get the code

1. [Fork the master branch](https://help.github.com/articles/fork-a-repo/) into your own GitHub repo.
2. Create a branch named after the feature you will contribute. The branch name should be kebab-case (e.g. my-new-feature).
3. Clone your repo locally and run `npm install` from your local repo's directory to install all required dependencies.
4. Run your first round of visual regression tests by following the instructions in the [Write visual regression tests](#write-visual-regression-tests) section below. This establishes baseline screenshots of the components in the master repo so that as you make changes and run your visual regression tests, your changes are validated against the state of the repo before the changes.

### Write the code

1. Launch a command prompt, `cd` to the folder where you cloned your branch, and run `npm run watch`.
2. Launch a second command prompt, `cd` to the folder where you cloned your branch, and run `skyux serve`. This launches the SKY UX component demos page where you write the demo components to test your code.
    - SKY UX demos are authored with [SKY UX Builder](https://github.com/blackbaud/skyux-cli). If this is your first time using SKY UX Builder, you must install the CLI as a global NPM package before you run `skyux serve`:
    ```sh
    $ npm install @blackbaud/skyux-cli -g
    ```
3. When you save code changes, the code compiles, static code analysis is performed, unit tests run, and the page refreshes with the latest changes.

Keep in mind that when you create components, you must add public exports through `./src/core.ts` and `./src/demo.ts` to allow users to import your component modules. The public exports provide entry points for the bundles that are deployed by SKY UX.

Also, the recommended change detection strategy for SKY UX components is to use [the `OnPush` property instead of `Default`](https://angular.io/api/core/ChangeDetectionStrategy).

### Write documentation

In addition to the demos that we require for new components, we recommend that you create reference documentation for [the Components section of the SKY UX website](https://developer.blackbaud.com/skyux/components). Component documentation should be extensive enough to explain the features of your components, including all properties and events. In [the SKY UX docs repo](https://github.com/blackbaud/skyux2-docs), you create subfolders for your components in the `src/app/components` folder and document them in `index.html` files. To create action buttons for your components on the Components section landing page, you add entries for the components in the `demo-components.service.ts` file. If you do not document your components, the SKY UX team will create the documentation for you. We just request that you [file an issue](https://github.com/blackbaud/skyux2/issues/new) for the documentation. However, we strongly encourage you to create your own documentation because it can be useful to uncover issues with your components.

### Write unit tests

Your unit test files should end in `.spec.ts` and reside in the same folders as the components that they test. For example, the test file for `foo/foo.component.ts` should be `foo/foo.component.spec.ts`. All test fixtures (sample components, mock services, etc.) should be in a `fixtures` folder within the component's folder. The existing codebase contains many examples of this pattern, so just follow the patterns in the existing code when you write tests for new components.

For new components, we recommend that you reach out to the SKY UX team for a "soft" review of the initial implementation before you write unit tests. This allows you to make requested changes to your code before writing the tests.

When your tests run, code coverage results are generated and can be located in `coverage/<browser version>/index.html`. You can launch this straight from disk and view the SKY UX unit test code coverage results in your default web browser.

### Write visual regression tests

During continuous integration builds, SKY UX runs visual regression tests through BrowserStack using [Protractor](http://www.protractortest.org/) and [pix-diff](https://github.com/koola/pix-diff). These prerequisites are automatically installed when you run `npm run test:visual` to create and compare screenshots in the `skyux-spa-visual-tests/screenshots-baseline-local/` folder.

To create visual tests for a new component, first create a folder for the tests in `skyux-spa-visual-tests/src/app`. Then add four files for the visual regression test:
  - `{componentName}-visual.component.html`: The template for the component to render and take a screenshot of.
  - `{componentName}-visual.component.ts`: The TypeScript code for the component to render and take a screenshot of.
  - `{componentName}.visual-spec.ts`: The Protractor code to run the screenshot tests.
  - `index.html`: The route file that contains the component to render and take a screenshot of.

To run visual regression tests locally, you must first run them locally against the `master` branch and then run the tests against your feature branch. Keep in mind that you need to use the same monitor and resolution on both set of tests. If your visual regression tests fail, you can check the failed tests at `skyux2\skyux-spa-visual-tests\screenshots-diff-local\diff` to find the cause of the failures.

### Submit the code

1. Commit and push your changes to your repo.
2. Submit a pull request.

### Available NPM scripts

`npm install` and `npm start` are special commands.  All other commands listed below should use the `npm run COMMAND` format.  For example, `npm run build`.

Script      | Description
----------- | -----------
`build`       | Cleans the previous build, compiles the Sass, and transpiles the JavaScript.
`clean`       | Cleans the previous build.
`clean:full`  | Cleans the previous build, `node_modules`, and coverage reports.
`lint`        | Runs TypeScript linter.
`test`        | Runs unit tests and visual regression tests.
`test:unit`   | Runs Karma unit tests.
`test:visual` | Runs WebDriver visual regression tests and accessibility tests.
`watch`       | Runs Karma unit tests and watches for file changes.


## Recommended tools

### Visual Studio Code setup

Like Angular 2, SKY UX is written in [TypeScript](https://www.typescriptlang.org/), and the free [Visual Studio Code editor](https://code.visualstudio.com/) is one of the best tools to work with TypeScript. It supports code navigation, refactoring tools, and a host of other features that are usually only found in richer IDEs. The SKY UX team uses Visual Studio Code and has some recommendations for configuring it to work best with Angular and SKY UX. Even if you do not want to use Visual Studio Code as your editor, the following information will still be useful because extensions are available for other popular editors such as [Atom](https://atom.io/), [Brackets](http://brackets.io/), and [Sublime Text](https://www.sublimetext.com/).

#### Visual Studio Code extensions

We highly recommend the following VS Code extensions:

- [TSLint](https://marketplace.visualstudio.com/items?itemName=eg2.tslint): This extension validates your TypeScript code against the rules specified by the `tslint.json` file in the SKY UX repo. TSLint runs during the CI build, so if this extension does not validate your code in VS Code, the CI build will fail.

- [EditorConfig](https://github.com/editorconfig/editorconfig-vscode): This extension allows VS Code to recognize the [`.editorconfig`](http://editorconfig.org/) file to automatically enforce many of the coding conventions that the SKY UX team uses, such as indent size, trailing whitespace rules, etc. If you do not use this extension, then you will find yourself fixing a lot of TSLint errors manually instead of letting VS Code do it for you.
