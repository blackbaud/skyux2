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
  SkyLookupChanges
} from '../../modules/lookup';

@Component({
  selector: 'sky-lookup-demo',
  templateUrl: './lookup-demo.component.html'
})
export class SkyLookupDemoComponent implements OnInit {
  public commandStream = new EventEmitter<any>();

  public colors: any[] = [
    { name: 'Red' },
    { name: 'Blue' },
    { name: 'Green' },
    { name: 'Purple' },
    { name: 'Yellow' },
    { name: 'Brown' },
    { name: 'White' },
    { name: 'Black' }
  ];

  public selectedColors: any[] = [
    { name: 'Red' }
  ];

  public formModel: FormGroup;

  public tokens = [
    {
      name: 'hello1'
    },
    {
      name: 'hello2'
    }
  ];

  public lookupInputId: string;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.createForm();
    this.formModel.reset({});
    this.formModel.controls.favoriteColors.reset(this.selectedColors);
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

  public onInputIdChanges(changes: SkyLookupChanges) {
    this.lookupInputId = changes.inputId;
  }

  public onResultSelected(changes: SkyLookupChanges) {
    // console.log('onResultSelected', changes);
  }

  public mySearchFunction(searchText: string): any[] {
    // console.log('searching based on:', searchText);
    return [{}];
  }

  public handleSelectionChanged(changes: any) {
    // console.log('Autocomplete, you selected:', changes.result);
  }

  private createForm(): void {
    this.formModel = this.formBuilder.group({
      favoriteColor: undefined,
      favoriteColors: new FormControl({
        name: undefined
      })
    });
  }
}
