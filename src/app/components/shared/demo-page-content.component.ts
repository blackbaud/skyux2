import {
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'sky-demo-page-content',
  templateUrl: './demo-page-content.component.html',
  styleUrls: ['./demo-page-content.component.scss']
})
export class SkyDemoPageContentComponent {
  @Input()
  public sectionHeading: string;
}
