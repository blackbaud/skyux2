import {Component} from 'angular2/core';
import {CheckboxComponent} from '../../../src/modules/core';
import {Bootstrapper} from '../../bootstrapper';

@Component({
  selector: 'my-app',
  template: require('./app.component.html'),
  directives: [CheckboxComponent]
})
export class AppComponent {
  selected = false;
}

Bootstrapper.bootstrap(AppComponent);
