import { Component } from '@angular/core';

@Component({
  selector: 'sky-cli-commands-action-buttons',
  templateUrl: 'cli-commands-action-button.component.html'
})
export class CLICommandsActionButtonsComponent {
  public routes = [
    {
      name: 'new',
      path: '/learn/reference/cli-commands/new',
      icon: 'plus-circle',
      // tslint:disable-next-line
      summary: 'Initializes a new local SKY UX project.'
    },
    {
      name: 'serve',
      path: '/learn/reference/cli-commands/serve',
      icon: 'cog',
      // tslint:disable-next-line
      summary: 'Serves the current application locally.'
    },
    {
      name: 'build',
      path: '/learn/reference/cli-commands/build',
      icon: 'cog',
      // tslint:disable-next-line
      summary: 'Builds the current SPA into the dist/ folder.'
    },
    {
      name: 'test',
      path: '/learn/reference/cli-commands/test',
      icon: 'tachometer',
      // tslint:disable-next-line
      summary: 'Runs any unit tests in the src/app folder.'
    },
    {
      name: 'e2e',
      path: '/learn/reference/cli-commands/e2e',
      icon: 'tachometer',
      // tslint:disable-next-line
      summary: 'Runs any e2e tests in the e2e folder.'
    },
    {
      name: 'watch',
      path: '/learn/reference/cli-commands/watch',
      icon: 'binoculars',
      // tslint:disable-next-line
      summary: 'Runs unit tests and watches for changes.'
    },
    {
      name: 'lint',
      path: '/learn/reference/cli-commands/lint',
      icon: 'tachometer',
      // tslint:disable-next-line
      summary: 'Validates Typescript code against rules.'
    },
    {
      name: 'build-public-library',
      path: '/learn/reference/cli-commands/build-public-library',
      icon: 'book',
      // tslint:disable-next-line
      summary: 'Bundles components into an NPM module.'
    },
    {
      name: 'version',
      path: '/learn/reference/cli-commands/version',
      icon: 'info-circle',
      // tslint:disable-next-line
      summary: 'Returns the version of SKY UX CLI.'
    },
    {
      name: 'help',
      path: '/learn/reference/cli-commands/help',
      icon: 'question-circle-o',
      // tslint:disable-next-line
      summary: 'Displays help for SKY UX CLI arguments.'
    }
  ];
}
