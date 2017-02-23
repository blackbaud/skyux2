import { Component, Output, ViewChild, EventEmitter } from '@angular/core';
import { SkyModalComponent } from '../modal';
import { SkyListComponent } from '../list';
import { SkyGridColumnModel } from './grid-column.model';
import { SkyModalInstance } from '../modal';

@Component({
  selector: 'sky-column-selector',
  templateUrl: './column-selector-modal.component.html'
})
export class SkyColumnSelectorComponent {
  public newSelectedColumnIds: Array<string>

  constructor(
    public columns: Array<SkyGridColumnModel>,
    public selectedColumnIds: Array<string>,
    public instance: SkyModalInstance
  ) {
    this.newSelectedColumnIds = selectedColumnIds;
  }

  public selectedColumnsChange(selectedMap: Map<string, boolean>) {
    this.newSelectedColumnIds = [];
    selectedMap.forEach((value, key) => {
      if (value) {
        this.newSelectedColumnIds.push(key);
      }
    });
  }

  public cancelChanges() {
    this.instance.cancel();
  }

  public applyChanges() {
    this.instance.save(this.newSelectedColumnIds);
  }
}
