import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';

import {
  SkyDemoComponentsService
} from './demo-components.service';

@Component({
  selector: 'sky-demo-components',
  templateUrl: './demo-components.component.html',
  styleUrls: ['./demo-components.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyDemoComponentsComponent implements OnInit {
  public actionButtonData: any[];

  constructor(
    private componentService: SkyDemoComponentsService
  ) { }

  public ngOnInit() {
    this.actionButtonData = this.componentService
      .getComponents()
      .map(component => {
        return {
          title: component.name,
          summary: component.summary,
          icon: component.icon,
          route: component.url
        };
      });
  }
}
