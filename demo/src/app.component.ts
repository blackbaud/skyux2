import {Component} from 'angular2/core';
import {SkyAlertComponent, SkyCardComponent, SkyCheckboxComponent} from '../../src/modules/core';

declare var require: any;

@Component({
  selector: 'my-app',
  template: require('./app.component.html'),
  directives: [SkyAlertComponent, SkyCardComponent, SkyCheckboxComponent]
})
export class AppComponent {
  checkboxSelected = true;

  showCardTitle = true;

  showCheckbox = true;
}
