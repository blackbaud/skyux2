import { EventEmitter } from '@angular/core';

export class ListFilterDataModel {
  public value: any = ''; // we use an empty string instead of null to simplify ngModel bindings
  public onChange: EventEmitter<any> = new EventEmitter<any>();

  public changed(value: any) {
    this.value = value;
    this.onChange.emit(value);
  }

  constructor(data?: any) {
    if (data) {
      this.value = data.value;
      this.onChange = data.onChange;
    }
  }
}
