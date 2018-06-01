import { Component, Input } from '@angular/core';

@Component({
  selector: 'sky-progress-indicator-item',
  templateUrl: './progress-indicator-item.component.html',
  styleUrls: ['./progress-indicator-item.component.scss']
})
export class SkyProgressIndicatorItemComponent {
  public isActive = false;
  public isComplete = false;
  public isLastItem = false;
  public isHorizontal = false;
  @Input() public itemNumber: number;
  @Input() public title: string;
  @Input() public titleHtml: string;
  @Input() public helpText = '';
}
