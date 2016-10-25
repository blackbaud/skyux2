import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

import { SkyDemoComponent } from './demo-component';
import { SkyDemoComponentsService } from './demo-components.service';

@Component({
  selector: 'sky-demo-components',
  templateUrl: './demo-components.component.html',
  styleUrls: ['./demo-components.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyDemoComponentsComponent {
  public get components(): SkyDemoComponent[] {
    return this.componentService.getComponents();
  }

  constructor(private componentService: SkyDemoComponentsService) { }
}
