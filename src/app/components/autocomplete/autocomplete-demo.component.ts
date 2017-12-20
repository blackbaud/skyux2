import {
  Component,
  EventEmitter,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  FormGroup
} from '@angular/forms';

import {
  SkyAutocompleteSearchResultSelectedEventArgs
} from '../../../core';

@Component({
  selector: 'sky-autocomplete-demo',
  templateUrl: './autocomplete-demo.component.html'
})
export class SkyAutocompleteDemoComponent implements OnInit {
  public commandStream = new EventEmitter<any>();
  public selectedColor: any;
  public formModel: FormGroup;

  public colors: any[] = [
    { name: 'Red' },
    { name: 'Blue' },
    { name: 'Green' },
    { name: 'Orange' },
    { name: 'Purple' },
    { name: 'Yellow' },
    { name: 'Brown' },
    { name: 'White' },
    { name: 'Black' }
  ];

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.createForm();
    this.formModel.reset({});
  }

  // public openDropdown(event: MouseEvent) {
  //   this.commandStream.emit({
  //     command: 'open'
  //   });
  //   event.stopPropagation();
  // }

  // public closeDropdown(event: MouseEvent) {
  //   this.commandStream.emit({
  //     command: 'close'
  //   });
  //   event.stopPropagation();
  // }

  public submit() {
    alert(`Your favorite color is ${this.formModel.value.favoriteColor}!`);
  }

  // public mySearchFunction(searchText: string): any[] {
  //   console.log('searching based on:', searchText);
  //   return [{}];
  // }

  public onSearchResultSelected(changes: SkyAutocompleteSearchResultSelectedEventArgs) {
    this.selectedColor = changes.result;
  }

  private createForm(): void {
    this.formModel = this.formBuilder.group({
      favoriteColor: undefined
    });
  }
}
