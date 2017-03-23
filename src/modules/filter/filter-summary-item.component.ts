import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'sky-filter-summary-item',
  styleUrls: ['./filter-summary-item.component.scss'],
  templateUrl: './filter-summary-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyFilterSummaryItemComponent {
  @Input()
  public dismissible: boolean = true;

  @Output()
  public dismiss: EventEmitter<any> = new EventEmitter();

  @Output()
  public itemClick: EventEmitter<any> = new EventEmitter();

  public onItemDismiss(event: any) {
    event.stopPropagation();
    this.dismiss.emit(undefined);

  }

  public onItemDismissKeypress(event: KeyboardEvent) {
    if (event.which === 13) {
      this.onItemDismiss(event);
    }
  }

  public onItemClick() {
    this.itemClick.emit(undefined);
  }

  public onItemKeypress(event: KeyboardEvent) {
    if (event.which === 13) {
      this.itemClick.emit(undefined);
    }
  }
}
