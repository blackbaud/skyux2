import {
  Component,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  FormGroup
} from '@angular/forms';

import {
  SkyAutocompleteSearchResultSelectedEventArgs,
  SkyAutocompleteChanges
} from '../../../core';

@Component({
  selector: 'sky-autocomplete-demo',
  templateUrl: './autocomplete-demo.component.html'
})
export class SkyAutocompleteDemoComponent implements OnInit {
  public formModel: FormGroup;
  public selectedColor: any;

  public colors: any[] = [
    { name: 'Red' },
    { name: 'Blue' },
    { name: 'Green' },
    { name: 'Orange' },
    { name: 'Purple' },
    { name: 'Yellow' },
    { name: 'Brown' },
    { name: 'Turquoise' },
    { name: 'White' },
    { name: 'Black' }
  ];

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.createForm();
  }

  public submit() {
    const color = this.formModel.value.favoriteColor.name;
    alert(`Your favorite color is ${color}!`);
  }

  public onSearchResultSelected(changes: SkyAutocompleteSearchResultSelectedEventArgs) {
    this.selectedColor = changes.result;
  }

  // public getSearchFunction(): Function {
  //   return (searchText: string) => {
  //     const searchTextLower = searchText.toLowerCase();

  //     const results = this.colors.filter((item: any) => {
  //       const val = item['name'];
  //       const isMatch = (val && val.toString().toLowerCase().indexOf(searchTextLower) > -1);
  //       return isMatch;
  //     });

  //     return results;
  //   };
  // }

  private createForm(): void {
    this.formModel = this.formBuilder.group({
      favoriteColor: { name: 'Turquoise' }
    });
  }
}
