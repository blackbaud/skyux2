import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'sky-list-view-action-button',
  templateUrl: './list-view-action-button.component.html',
  styleUrls: ['./list-view-action-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyListViewActionButtonComponent {
  @Input()
  public items: any[];

  constructor() { }
}
