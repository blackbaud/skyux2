import { Component, ViewChild } from '@angular/core';
import { ListState, ListStateDispatcher } from '../list/state';
import { SkyModalComponent } from '../modal';
import { ListFiltersUpdateAction } from '../list/state/filters/actions';
import { ListFilterModel } from '../list/state/filters/filter.model';
import { ListFilterDataModel } from '../list/state/filters/filter-data.model';

@Component({
  selector: 'sky-list-filters-modal',
  templateUrl: './list-filters-modal.component.html',
  styleUrls: ['./list-filters-modal.component.scss']
})
export class SkyListFiltersModalComponent {
  private filters: Array<any> = [];
  @ViewChild(SkyModalComponent) private modal: SkyModalComponent;

  constructor(
    private state: ListState,
    private dispatcher: ListStateDispatcher,
    private title: string
  ) {
    this.state.map(s => s.filters)
      .take(1)
      .subscribe(filters => this.filters = filters.map(f => {
        let r = new ListFilterModel(f);
        r.filterModel = new ListFilterDataModel(r.filterModel);
        return r;
      }));
  }

  get modalFilters() {
    return this.filters.filter(f => f.type !== 'inline');
  }

  public applyFilters() {
    this.dispatcher.next(new ListFiltersUpdateAction(this.filters));
    this.modal.closeButtonClick();
  }

  public clearFilters() {
    this.filters.forEach(f => f.type !== 'inline' ? f.filterModel.value = '' : undefined);
  }
}
