import {
  Component, ViewChild, ElementRef
} from '@angular/core';

import {
  SkySelectFieldContext,
  SkySelectField
} from '../';
import { SkySelectFieldFormComponent } from '../select-field-form.component';
@Component({
  selector: 'sky-select-field-form-test',
  templateUrl: './select-field-form.component.fixture.html'
})
export class SkySelectFieldFormTestComponent {

  @ViewChild(SkySelectFieldFormComponent, { read: ElementRef })
  public selectFieldFormElementRef: ElementRef;

  @ViewChild(SkySelectFieldFormComponent)
  public selectFieldFormComponent: SkySelectFieldFormComponent;

  public context: SkySelectFieldContext = new SkySelectFieldContext();
  public results: SkySelectField;
  public modal: any;
  constructor() { }

}
