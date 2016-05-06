import {Component} from 'angular2/core';
import {ChevronComponent} from '../../../src/modules/chevron';
import {Bootstrapper} from '../../bootstrapper';

@Component({
  selector: 'my-app',
  template: require('./app.component.html'),
  directives: [ChevronComponent]
})
export class AppComponent {
  direction = 'up';
}

Bootstrapper.bootstrap(AppComponent);
