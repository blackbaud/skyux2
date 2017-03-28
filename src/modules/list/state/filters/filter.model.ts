import { ListItemModel } from '../../../list/state/items/item.model';

import {
  EventEmitter,
  TemplateRef
} from '@angular/core';

export class ListFilterModel {
  public name: string;
  public label: string;
  public dismissible: boolean = true;
  public value: any;

  public filterFunction: (item: ListItemModel, filter: any) => boolean;

  public onChange: EventEmitter<any> = new EventEmitter<any>();

  public template: TemplateRef<any>;

  public changed(value: any) {
    this.value = value;
    this.onChange.emit(value);
  }

  constructor(data?: any) {
    if (data) {
      this.name = data.name;
      this.label = data.label;
      this.filterFunction = data.filterFunction;
      this.value = data.value;
      this.dismissible = data.dismissible;
      this.template = data.template;
    }
  }
}
