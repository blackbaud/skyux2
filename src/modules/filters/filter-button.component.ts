import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'sky-filter-button',
  styleUrls: ['./filter-button.component.scss'],
  templateUrl: './filter-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyFilterButtonComponent {
  @Input()
  public filterButtonActive: boolean = false;

  @Output()
  filterButtonClick: EventEmitter<any> = new EventEmitter();

  public filterButtonOnClick() {
    this.filterButtonClick.emit(undefined);
  }
}
