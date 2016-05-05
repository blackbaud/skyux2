import {Component} from 'angular2/core';
import {AlertComponent} from '../../../src/modules/core';
import {Bootstrapper} from '../../bootstrapper';

@Component({
  selector: 'my-app',
  template: require('./app.component.html'),
  directives: [AlertComponent]
})
class AppComponent {
  alertCloseable = true;
}

Bootstrapper.bootstrap(AppComponent);
