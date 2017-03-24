import {
  Component,
  ViewChild
} from '@angular/core';

import {
  ListState,
  ListStateDispatcher
} from '../list/state';

import {
  SkyModalComponent
} from '../modal';

import {
  ListFilterModel,
  ListFilterDataModel
} from '../list/state';

@Component({
  selector: 'sky-list-filters-modal',
  templateUrl: './list-filters-modal.component.html',
  styleUrls: ['./list-filters-modal.component.scss']
})
export class SkyListFiltersModalComponent {
  private filters: Array<any> = [];

  @ViewChild(SkyModalComponent)
  private modal: SkyModalComponent;

  constructor(
    private state: ListState,
    private dispatcher: ListStateDispatcher,
    private title: string
  ) {
    this.state.map(s => s.filters)
      .take(1)
      .subscribe(filters => {
        this.filters = filters.map(f => {
          let model = new ListFilterModel(f);
          model.filterModel = new ListFilterDataModel(model.filterModel)
          return model;
        });
      });
  }

  get modalFilters() {
    return this.filters.filter(f => f.type !== 'inline');
  }

  public applyFilters() {
    this.dispatcher.filtersUpdate(this.filters);
    this.modal.closeButtonClick();
  }

  public clearFilters() {
    this.filters.forEach(f => f.type !== 'inline' ? f.filterModel.value = '' : undefined);
  }
}
