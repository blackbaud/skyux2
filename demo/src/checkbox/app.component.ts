import { Component } from '@angular/core';

import { SkyCheckboxComponent } from '../../../src/core';
import { Bootstrapper } from '../../bootstrapper';

import {NgForm, disableDeprecatedForms, provideForms} from '@angular/forms';

@Component({
  selector: 'sky-demo-app',
  template: require('./app.component.html'),
  directives: [SkyCheckboxComponent]
})
export class AppComponent {
  public selected = false;
  public selected2 = true;
}

Bootstrapper.bootstrapDependencies(AppComponent, [
  disableDeprecatedForms(),
  provideForms()
]);
