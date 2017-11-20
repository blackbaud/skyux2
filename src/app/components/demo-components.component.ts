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
  public actionButtons: any;

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

    this.actionButtons = this.componentService.getComponents().map((component: any) => {
      return {
        actionClick: function () {
          console.log('clicked!');
        },
        heading: component.name,
        iconType: component.icon,
        summary: component.summary
      };
    });
  }
}
