import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from './app.component';

require('style-loader!../../src/scss/sky.scss');
require('font-awesome-webpack');

bootstrap(AppComponent);
