import {
  Component,
  ViewChild,
  ElementRef
} from '@angular/core';

import {
  SkyDefinitionListService
} from './definition-list.service';

@Component({
  selector: 'sky-definition-list-value',
  templateUrl: './definition-list-value.component.html',
  styleUrls: ['./definition-list-value.component.scss']
})
export class SkyDefinitionListValueComponent {

  @ViewChild('valueEl')
  set valueElement(newValue: ElementRef) {
    this.hasValue = newValue.nativeElement.innerText.trim() !== undefined;
  }

  public defaultValue: string;

  public hasValue: boolean;

  constructor(public service: SkyDefinitionListService) { }
}
