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
  public reactiveForm: FormGroup;

  public iceCreamFlavors: any[] = [
    { name: 'Chocolate' },
    { name: 'Moose Tracks' },
    { name: 'Rocky Road' },
    { name: 'Strawberry' },
    { name: 'Vanilla' }
  ];

  public favoriteIceCreamFlavors: any[] = [
    { name: 'Chocolate' }
  ];

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.createForm();
  }

  public enableLookup() {
    this.reactiveForm.controls.favoriteIceCreamFlavors.enable();
  }

  public disableLookup() {
    this.reactiveForm.controls.favoriteIceCreamFlavors.disable();
  }

  public submitReactiveForm() {
    alert('Form submitted with: ' + JSON.stringify(this.reactiveForm.value));
  }

  private createForm(): void {
    this.reactiveForm = this.formBuilder.group({
      favoriteIceCreamFlavors: new FormControl({
        value: this.favoriteIceCreamFlavors,
        disabled: false
      })
    });
  }
}
