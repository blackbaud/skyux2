import { TemplateRef } from '@angular/core';

export class ListViewGridColumnModel {
  public template: TemplateRef<any>;
  public id: string;
  public field: string;
  public type: string;
  public searchFunction: (data: any, searchText: string) => boolean;
  public heading: string;
  public description: string;
  public width: number;
  public hidden: boolean;
  public locked: boolean;

  constructor(template: TemplateRef<any>, data?: any) {
    this.template = template;

    if (data) {
      this.id = data.id || data.field;
      this.field = data.field;
      this.type = data.type;
      this.searchFunction = data.searchFunction;
      this.heading = data.heading;
      this.description = data.description;
      this.width = data.width ? Number(data.width) : undefined;
      this.hidden = data.hidden;
      this.locked = data.locked;
    }
  }
}
