import {
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

import {
  SkySelectField,
  SkySelectFieldComponent
} from '../index';

@Component({
  selector: 'sky-select-field-test',
  templateUrl: './select-field.component.fixture.html'
})
export class SkySelectFieldTestComponent {
  @ViewChild(SkySelectFieldComponent, { read: ElementRef })
  public selectFieldElementRef: ElementRef;

  @ViewChild(SkySelectFieldComponent)
  public selectFieldComponent: SkySelectFieldComponent;

  public pickerItems: SkySelectField = [];
  public itemSelected: SkySelectField = [];
  public modeStyle: string;
  public modeText: string;

}
