import {
  Component,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup
} from '@angular/forms';

import {
  SkyAutocompleteSearchFunctionFilter
} from '../../core';

@Component({
  selector: 'sky-lookup-demo',
  templateUrl: './lookup-demo.component.html'
})
export class SkyLookupDemoComponent implements OnInit {
  public reactiveForm: FormGroup;

  public people: any[] = [
    { name: 'Andy' },
    { name: 'Beth' },
    { name: 'David' },
    { name: 'Frank' },
    { name: 'Grace' },
    { name: 'Isaac' },
    { name: 'John' },
    { name: 'Joyce' },
    { name: 'Lindsey' },
    { name: 'Mitch' },
    { name: 'Patty' },
    { name: 'Paul' },
    { name: 'Quincy' },
    { name: 'Sally' },
    { name: 'Susan' },
    { name: 'Vanessa' },
    { name: 'Winston' },
    { name: 'Xavier' },
    { name: 'Yolanda' },
    { name: 'Zack' }
  ];

  public friends: any[] = [
    { name: 'Susan' }
  ];

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.createForm();

    // If you need to execute some logic after the lookup values change,
    // subscribe to Angular's built-in value changes observable.
    this.reactiveForm.valueChanges.subscribe(changes => {
      console.log('Lookup value changes:', changes);
    });
  }

  // Only show people in the search results that have not been chosen already.
  public getSearchFilters(): SkyAutocompleteSearchFunctionFilter[] {
    const friends: any[] = this.reactiveForm.controls.friends.value;
    return [
      (searchText: string, item: any): boolean => {
        const found = friends.find(friend => friend.name === item.name);
        return !found;
      }
    ];
  }

  public enableLookup() {
    this.reactiveForm.controls.friends.enable();
  }

  public disableLookup() {
    this.reactiveForm.controls.friends.disable();
  }

  public submitReactiveForm() {
    alert('Form submitted with: ' + JSON.stringify(this.reactiveForm.value));
  }

  private createForm(): void {
    this.reactiveForm = this.formBuilder.group({
      friends: new FormControl(this.friends)
    });
  }
}
