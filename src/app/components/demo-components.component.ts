import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';

import { SkyDemoComponent } from './demo-component';
import { SkyDemoComponentsService } from './demo-components.service';

@Component({
  selector: 'sky-demo-components',
  templateUrl: './demo-components.component.html',
  styleUrls: ['./demo-components.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyDemoComponentsComponent implements OnInit {
  public actionButtonComponents: SkyDemoComponent[];
  public displayedItems: any;

  constructor(private componentService: SkyDemoComponentsService) { }

  public ngOnInit() {
    this.actionButtonComponents = this.componentService.getComponents().map(component => {
      return {
        path: [component.url],
        name: component.name,
        icon: component.icon,
        summary: component.summary
      };
    });
    this.displayedItems = this.actionButtonComponents;
  }

  public searchApplied(searchText: string) {
    let filteredItems = this.actionButtonComponents;
    if (searchText) {
      filteredItems = this.actionButtonComponents.filter(function (item: any){
        let property: any;
        for (property in item) {
          if (item.hasOwnProperty(property) && (property === 'name' || property === 'summary')) {
            if (item[property].toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
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
