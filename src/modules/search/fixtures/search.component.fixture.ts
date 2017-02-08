import {
  Component,
  ViewChild
} from '@angular/core';

import {
  SkySearchComponent
} from '../search.component';

@Component({
  selector: 'sky-test-cmp',
  template: require('./search.component.fixture.html')
})
export class SearchTestComponent {
  @ViewChild(SkySearchComponent)
  public searchComponent: SkySearchComponent;

  public searchText: string;
  public placeholderText: string;

  public isCollapsible: boolean;

  public isFullWidth: boolean;

  public hasDarkTheme: boolean;

  public lastSearchTextApplied: string;
  public lastSearchTextChanged: string;

  public searchApplied(searchText: string) {
    this.lastSearchTextApplied = searchText;
  }
  public searchChanged(searchText: string) {
    this.lastSearchTextChanged = searchText;
  }
}
