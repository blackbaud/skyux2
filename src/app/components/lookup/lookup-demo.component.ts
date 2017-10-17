import { Component } from '@angular/core';

@Component({
  selector: 'sky-lookup-demo',
  templateUrl: './lookup-demo.component.html'
})
export class SkyLookupDemoComponent {
  public oceans: any[];
  public selectedOceans: any[];

  public fruits: any[];
  public selectedFruits: any[];

  public colors: any[];
  public selectedColors: any[];

  constructor() {
    this.oceans = [
      { name: 'Antarctic' },
      { name: 'Atlantic' },
      { name: 'Arctic' },
      { name: 'Indian' },
      { name: 'Pacific' }
    ];
    this.fruits = [
      { fruit: 'Apple' },
      { fruit: 'Grape' },
      { fruit: 'Orange' },
      {
        fruit: 'Tomato',
        description: 'Is it a fruit or a vegetable?'
      }
    ];
    this.selectedFruits = [this.fruits[1]];
    this.colors = [
      { name: 'Red' },
      { name: 'Blue' },
      { name: 'Green' },
      { name: 'Purple' },
      { name: 'Yellow' },
      { name: 'Brown' },
      { name: 'White' },
      { name: 'Black' }
    ];
    this.selectedColors = [this.colors[2]];
  }
}
