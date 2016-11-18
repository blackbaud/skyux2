import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';

import { SkyDemoComponent } from './demo-component';
import { SkyDemoComponentsService } from './demo-components.service';
import { SkyDemoTitleService } from '../shared/title.service';

@Component({
  selector: 'sky-demo-components',
  templateUrl: './demo-components.component.html',
  styleUrls: ['./demo-components.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyDemoComponentsComponent implements OnInit {
  public get components(): SkyDemoComponent[] {
    return this.componentService.getComponents();
  }

  constructor(
    private titleService: SkyDemoTitleService,
    private componentService: SkyDemoComponentsService
  ) { }

  public ngOnInit() {
    this.titleService.setTitle('Components');
  }
}
