import { ListItemModel } from '../../../list/state/items/item.model';
import { ListFilterDataModel } from './filter-data.model';
import { TemplateRef } from '@angular/core';

export class ListFilterModel {
  public label: string;
  public view: string;
  public type: string;
  public filterFunction: (item: ListItemModel, filter: any) => boolean;
  public filterModel: ListFilterDataModel = new ListFilterDataModel();
  public template: TemplateRef<any>;

  constructor(data?: any, view?: string) {
    this.view = view;

    if (data) {
      this.label = data.label;
      this.type = data.type;
      this.filterFunction = data.filterFunction;
      this.filterModel = data.filterModel || new ListFilterDataModel();
      this.template = data.template;
    }
  }
}
