import {Component} from 'angular2/core';
import {CardComponent} from '../../../src/modules/core';
import {Bootstrapper} from '../../bootstrapper';

@Component({
  selector: 'my-app',
  template: require('./app.component.html'),
  directives: [CardComponent]
})
export class AppComponent {
  showCardTitle = true;

  showCheckbox = true;
}

Bootstrapper.bootstrap(AppComponent);
