import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

@Component({
  selector: 'sky-demo-page-example',
  templateUrl: './demo-page-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyDemoPageExampleComponent { }
