#Contributing

Below are details on how to contribute to SKY UX 2.  

## Coding conventions

SKY UX 2 adheres to the highly-opinionated [Angular 2 style guide](https://angular.io/styleguide). Pull requests with code that violates these rules will not be accepted. 

## Visual Studio Code setup

Like Angular 2, SKY UX 2 is written in [TypeScript](https://www.typescriptlang.org/), and the free [Visual Studio Code editor](https://code.visualstudio.com/) is one of the best options for working with TypeScript.  It supports code navigation, refactoring tools, and a host of other features that are usually only found in richer IDEs.  The SKY UX team uses Visual Studio Code and has some recommendations for configuring it to work best with Angular 2 and SKY UX 2. Even if you do not want to use Visual Studio Code as your editor, some of the following information will still be useful as many of the extensions and other tips are available for other popular editors such as [Atom](https://atom.io/), [Brackets](http://brackets.io/) and [Sublime Text](https://www.sublimetext.com/).

### Extensions

The following VS Code extensions are highly recommended:

- [TSLint](https://marketplace.visualstudio.com/items?itemName=eg2.tslint): This extension will validate your TypeScript code against the rules specified in the `tslint.json` file in the SKY UX repo.  TSLint will be run during the CI build, so if your code does not validate in VS Code with the use of this extension, the CI build will fail.

- [EditorConfig](https://github.com/editorconfig/editorconfig-vscode): This extension allows VS Code to recognize this project's [`.editorconfig`](http://editorconfig.org/) file so that many of the coding conventions used by the SKY UX team can be automatically enforced, such as indent size, trailing whitespace rules, etc.  If you do not use this extension then you will find yourself fixing a lot of TSLint errors manually instead of letting VS Code do it for you.
