import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges
} from '@angular/core';

import { SkySortService } from './sort.service';

@Component({
  selector: 'sky-sort-item',
  styleUrls: ['./sort-item.component.scss'],
  templateUrl: './sort-item.component.html'
})
export class SkySortItemComponent implements OnInit, OnChanges {
  @Input()
  public active: boolean;
  @Output()
  public itemSelect: EventEmitter<any> = new EventEmitter();

  public isSelected: boolean = false;

  constructor(private sortService: SkySortService) {}

  public ngOnInit() {
    this.sortService.addItem(this);
    if (this.active) {
      this.sortService.selectItem(this);
    }
  }

  public ngOnChanges() {

  }

  public itemClicked() {
    this.sortService.selectItem(this);
    this.itemSelect.emit(null);
  }
}
