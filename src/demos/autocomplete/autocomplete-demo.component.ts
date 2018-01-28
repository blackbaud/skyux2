import {
  Component,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  FormGroup
} from '@angular/forms';

import {
  SkyAutocompleteSearchFunction,
  SkyAutocompleteSearchFunctionFilter,
  SkyAutocompleteSearchFunctionResponse,
  SkyAutocompleteSelectionChange
} from '../../core';

@Component({
  selector: 'sky-autocomplete-demo',
  templateUrl: './autocomplete-demo.component.html',
  styleUrls: ['./autocomplete-demo.component.scss']
})
export class SkyAutocompleteDemoComponent implements OnInit {
  public reactiveForm: FormGroup;
  public templateDrivenModel: any = {
    favoriteColor: { name: 'Red' }
  };

  public selectedColor: any;
  public colors: any[] = [
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

  public largestOcean: any;
  public oceans: any[] = [
    { title: 'Arctic', id: 1 },
    { title: 'Atlantic', id: 2 },
    { title: 'Indian', id: 3 },
    { title: 'Pacific', id: 4 }
  ];

  public farthestPlanet: any;
  public planets: any[] = [
    { name: 'Mercury', description: 'Mercury is a planet in our solar system.' },
    { name: 'Venus', description: 'Venus is a planet in our solar system.' },
    { name: 'Earth', description: 'Earth is a planet in our solar system.' },
    { name: 'Mars', description: 'Mars is a planet in our solar system.' },
    { name: 'Jupiter', description: 'Jupiter is a planet in our solar system.' },
    { name: 'Saturn', description: 'Saturn is a planet in our solar system.' },
    { name: 'Uranus', description: 'Uranus is a planet in our solar system.' },
    { name: 'Neptune', description: 'Neptune is a planet in our solar system.' }
  ];

  public searchFilters: SkyAutocompleteSearchFunctionFilter[] = [
    (searchText: string, item: any): boolean => {
      return (item.name !== 'Red');
    }
  ];

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.createForm();
  }

  public submitTemplateForm(formData: any) {
    alert('Form submitted with: \n' + JSON.stringify(formData));
  }

  public submitReactiveForm() {
    alert('Form submitted with: \n' + JSON.stringify(this.reactiveForm.value));
  }

  public onPlanetSelection(args: SkyAutocompleteSelectionChange) {
    alert(`You selected ${args.selectedItem.name}`);
  }

  public getOceanSearchFunction(): SkyAutocompleteSearchFunction {
    const searchFunction = (searchText: string): SkyAutocompleteSearchFunctionResponse => {
      return new Promise((resolve: Function) => {
        const searchTextLower = searchText.toLowerCase();

        const results = this.oceans.filter((ocean: any) => {
          const val = ocean.title;
          const isMatch = (val && val.toString().toLowerCase().indexOf(searchTextLower) > -1);
          return isMatch;
        });

        // Simulate remote call:
        setTimeout(() => {
          resolve(results);
        }, 500);
      });
    };

    return searchFunction;
  }

  private createForm(): void {
    this.reactiveForm = this.formBuilder.group({
      favoriteColor: undefined,
      farthestPlanet: {},
      largestOcean: { title: 'Arctic', id: 1 }
    });
  }
}
