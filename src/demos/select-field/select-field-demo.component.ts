import {
  Component,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup
} from '@angular/forms';

// import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/take';

@Component({
  selector: 'sky-select-field-demo',
  templateUrl: 'select-field-demo.component.html'
})
export class SkySelectFieldDemoComponent implements OnInit {
  public reactiveForm: FormGroup;

  public fruits = [
    { id: '1', category: 'Pome', label: 'Apple', description: 'Anne eats apples' },
    { id: '2', category: 'Berry', label: 'Banana', description: 'Ben eats bananas' },
    { id: '3', category: 'Pome', label: 'Pear', description: 'Patty eats pears' },
    { id: '4', category: 'Berry', label: 'Grape', description: 'George eats grapes' },
    { id: '5', category: 'Berry', label: 'Banana', description: 'Becky eats bananas' },
    { id: '6', category: 'Citrus', label: 'Lemon', description: 'Larry eats lemons' },
    { id: '7', category: 'Aggregate fruit', label: 'Strawberry', description: 'Sally eats strawberries' }
  ];

  public colors = [
    { id: '1', label: 'Red' },
    { id: '2', label: 'Green' },
    { id: '3', label: 'Violet' }
  ];

  public fruitStream = new BehaviorSubject<any>(this.fruits);
  public colorStream = new BehaviorSubject<any>(this.colors);

  public singleModeStyle = 'single';
  public singleModeText = 'Select a value';
  public multipleModeText = 'Select some values';

  // public get selectedIds(): string[] {
  //   return this.reactiveForm.controls.favoriteFruits.value.map((fruit: any) => fruit.id);
  // }

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.createForm();
    // this.reactiveForm.controls.favoriteFruits.valueChanges.subscribe((change: any) => {
    //   console.log('change?', change);
    // });
  }

  public submitReactiveForm(): void {
    alert('Form submitted with: \n' + JSON.stringify(this.reactiveForm.value));
  }

  // public selectedItemsChange(selectedMap: Map<string, boolean>) {
  //   this.fruitStream.take(1).subscribe((fruits: any[]) => {
  //     const selected = fruits.filter((fruit: any) => selectedMap.get(fruit.id));
  //     this.reactiveForm.controls.favoriteFruits.setValue(selected);
  //   });
  // }

  // public parseSelectedIds(selectedItems: any[]): string[] {
  //   return selectedItems.map(item => item.id);
  // }

  private createForm(): void {
    this.reactiveForm = this.formBuilder.group({
      favoriteColor: new FormControl(),
      favoriteFruits: new FormControl([
        this.fruits[0]
      ]),
      disabledColor: {
        value: this.colors[0],
        disabled: true
      },
      disabledFruits: {
        value: [this.fruits[0]],
        disabled: true
      }
    });
  }
}
