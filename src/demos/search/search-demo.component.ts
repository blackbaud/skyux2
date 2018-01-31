import { Component } from '@angular/core';

@Component({
  selector: 'sky-search-demo',
  templateUrl: './search-demo.component.html'
})
export class SkySearchDemoComponent {
  public displayedItems: any;
  public searchText: string;

  private items: any[] = [
    {
      title: 'Call Robert Hernandez',
      note: 'Robert recently gave a very generous gift. We should call to thank him.'
    },
    {
      title: 'Send invitation to ball',
      note: 'The Spring Ball is coming up soon. Let\'s get those invitations out!'
    },
    {
      title: 'Clean up desk',
      note: 'File and organize papers.'
    },
    {
      title: 'Investigate leads',
      note: 'Check out leads for important charity event funding.'
    },
    {
      title: 'Send thank you note',
      note: 'Send a thank you note to Timothy for his donation.'
    }
  ];

  constructor() {
    this.displayedItems = this.items;
  }

  public searchApplied(searchText: string) {
    let filteredItems = this.items;
    this.searchText = searchText;

    if (searchText) {
      filteredItems = this.items.filter(function (item: any) {
        let property: any;

        for (property in item) {
          if (item.hasOwnProperty(property) && (property === 'title' || property === 'note')) {
            if (item[property].indexOf(searchText) > -1) {
              return true;
            }
          }
        }

        return false;
      });
    }
    this.displayedItems = filteredItems;
  }
}
