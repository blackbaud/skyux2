import {Component} from 'angular2/core';
import {SkyAlertComponent, SkyCardComponent, SkyCheckboxComponent} from '../../src/modules/core';

@Component({
  selector: 'my-app',
  template: require('./app.component.html'),
  directives: [SkyAlertComponent, SkyCardComponent, SkyCheckboxComponent]
})
export class AppComponent {
  alertCloseable: true;

  checkboxSelected = true;

  showCardTitle = true;

  showCheckbox = true;
}
