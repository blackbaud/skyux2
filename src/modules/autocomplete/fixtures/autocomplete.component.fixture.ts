import {
  Component,
  TemplateRef,
  ViewChild
} from '@angular/core';

import {
  NgForm
} from '@angular/forms';

import {
  SkyAutocompleteComponent,
  SkyAutocompleteInputDirective,
  SkyAutocompleteSearchFunction,
  SkyAutocompleteSearchFunctionFilter,
  SkyAutocompleteSelectionChange
} from '../index';

@Component({
  selector: 'sky-autocomplete-test',
  templateUrl: './autocomplete.component.fixture.html'
})
export class SkyAutocompleteTestComponent {
  public data: any[] = [
    { name: 'Red' },
    { name: 'Blue' },
    { name: 'Green' },
    { name: 'Orange' },
    { name: 'Pink' },
    { name: 'Purple' },
    { name: 'Yellow' },
    { name: 'Brown' },
    { name: 'Turquoise' },
    { name: 'White' },
    { name: 'Black' }
  ];

  public model: any = {
    favoriteColor: undefined
  };
  public descriptorProperty: string;
  public propertiesToSearch: string[];
  public search: SkyAutocompleteSearchFunction;
  public searchFilters: SkyAutocompleteSearchFunctionFilter[];
  public searchResultsLimit: number;
  public searchResultTemplate: TemplateRef<any>;
  public searchTextMinimumCharacters: number;

  @ViewChild(SkyAutocompleteComponent)
  public autocomplete: SkyAutocompleteComponent;

  @ViewChild(SkyAutocompleteInputDirective)
  public autocompleteInput: SkyAutocompleteInputDirective;

  @ViewChild('myForm')
  public myForm: NgForm;

  public onSelectionChange(event: SkyAutocompleteSelectionChange) { }
}
