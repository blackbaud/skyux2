import {
  Component,
  ViewChild
} from '@angular/core';

import {
  SkyLookupComponent,
  SkyLookupSelectionChange
} from '../lookup.component';

@Component({
  selector: 'sky-test-cmp',
  templateUrl: './lookup.component.fixture.html'
})
export class LookupTestComponent {
  @ViewChild(SkyLookupComponent)
  public lookupComponent: SkyLookupComponent;

  public placeholderText: string;

  public multiple: boolean;
  public resultsLimit: number;
  public propertiesToSearch: Array<string> = ['name'];
  public searchDelay: number = 0;

  public data: Array<any> = [];
  public selectedItems: Array<any> = [];

  public lastSelectionChange: SkyLookupSelectionChange;

  public selectionChanged(event: SkyLookupSelectionChange) {
    this.lastSelectionChange = event;
  }
}
