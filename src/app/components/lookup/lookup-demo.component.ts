import { Component } from '@angular/core';

@Component({
  selector: 'sky-lookup-demo',
  templateUrl: './lookup-demo.component.html'
})
export class SkyLookupDemoComponent {
  public oceans: any[] = [
    { name: 'Antarctic' },
    { name: 'Atlantic' },
    { name: 'Artic' },
    { name: 'Indian' },
    { name: 'Pacific' }
  ];
  public selectedOceans: any[] = [];

  public fruits: any[] = [
    { fruit: 'Apple' },
    { fruit: 'Grape' },
    { fruit: 'Orange' },
    {
      fruit: 'Tomato',
      description: 'Is it a fruit or a vegetable?'
    }
  ];
  public selectedFruits: any[] = [];

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
  public selectedColors: any[] = [];

}
