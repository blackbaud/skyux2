import { TemplateRef } from '@angular/core';

export class SkyGridColumnModel {
  public template: TemplateRef<any>;
  public id: string;
  public field: string;
  public heading: string;
  public type: string;
  public width: number;
  public hidden: boolean;
  public locked: boolean;
  public description: string;
  public isSortable: boolean = true;
  public searchFunction: (data: any, searchText: string) => boolean;

  constructor(template: TemplateRef<any>, data?: any) {
    this.template = template;

    if (data) {
      this.id = data.id || data.field;
      this.type = data.type;
      this.field = data.field;
      this.heading = data.heading;
      this.width = data.width ? Number(data.width) : undefined;
      this.hidden = data.hidden;
      this.locked = data.locked;
      this.description = data.description;
      this.searchFunction = data.searchFunction;
      this.isSortable = data.isSortable;
    }
  }
}
