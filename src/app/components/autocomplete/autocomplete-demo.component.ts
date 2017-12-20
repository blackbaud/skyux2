import {
  Component,
  EventEmitter,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  FormControl,
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

  public formModel: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.createForm();
    this.formModel.reset({});
  }

  public openDropdown(event: MouseEvent) {
    this.commandStream.emit({
      command: 'open'
    });
    event.stopPropagation();
  }

  public closeDropdown(event: MouseEvent) {
    this.commandStream.emit({
      command: 'close'
    });
    event.stopPropagation();
  }

  public submit() {
    console.log('submitted with:', this.formModel.value);
  }

  public mySearchFunction(searchText: string): any[] {
    console.log('searching based on:', searchText);
    return [{}];
  }

  public onResultSelected(changes: SkyAutocompleteSearchResultSelectedEventArgs) {
    console.log('Autocomplete, you selected:', changes.result);
  }

  private createForm(): void {
    this.formModel = this.formBuilder.group({
      favoriteColor: undefined
    });
  }
}
