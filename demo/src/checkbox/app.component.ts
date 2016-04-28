import {Component} from 'angular2/core';
import {SkyCheckboxComponent} from '../../../src/modules/core';
import {Bootstrapper} from '../../bootstrapper';

@Component({
  selector: 'my-app',
  template: require('./app.component.html'),
  directives: [SkyCheckboxComponent]
})
export class AppComponent {

}

Bootstrapper.bootstrap(AppComponent);
