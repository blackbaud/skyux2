import {
  Component,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormControl
} from '@angular/forms';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/take';

@Component({
  selector: 'sky-select-field-demo',
  templateUrl: 'select-field-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkySelectFieldDemoComponent implements OnInit {
  public reactiveForm: FormGroup;

  public colors = [
    { id: '1', label: 'Red' },
    { id: '2', label: 'Green' },
    { id: '3', label: 'Violet' }
  ];

  public fruits = [
    { id: '1', category: 'Pome', label: 'Apple', description: 'Anne eats apples' },
    { id: '2', category: 'Berry', label: 'Banana', description: 'Ben eats bananas' },
    { id: '3', category: 'Pome', label: 'Pear', description: 'Patty eats pears' },
    { id: '4', category: 'Berry', label: 'Grape', description: 'George eats grapes' },
    { id: '5', category: 'Berry', label: 'Banana', description: 'Becky eats bananas' },
    { id: '6', category: 'Citrus', label: 'Lemon', description: 'Larry eats lemons' },
    { id: '7', category: 'Aggregate fruit', label: 'Strawberry', description: 'Sally eats strawberries' }
  ];

  public fruitStream = new BehaviorSubject<any>([]);
  public colorStream = new BehaviorSubject<any>([]);

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.createForm();
    this.populateData();
  }

  public submitReactiveForm(): void {
    alert('Form submitted with: \n' + JSON.stringify(this.reactiveForm.value));
  }

  private createForm(): void {
    this.reactiveForm = this.formBuilder.group({
      favoriteColor: new FormControl(),
      favoriteFruits: new FormControl([this.fruits[0]]),
      disabledColor: new FormControl(this.colors[0]),
      disabledFruits: new FormControl([this.fruits[0]])
    });

    this.reactiveForm.controls.disabledColor.disable();
    this.reactiveForm.controls.disabledFruits.disable();
  }

  private populateData() {
    this.fruitStream.next(this.fruits);
    this.colorStream.next(this.colors);
  }
}
