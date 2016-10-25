import { Component, Input, ContentChildren, TemplateRef, QueryList } from '@angular/core';
import { ListItemModel } from '../list/state/items/item.model';
import { ListViewComponent } from '../list/list-view.component';

@Component({
  selector: 'sky-list-filter',
  template: '<ng-content></ng-content>'
})
export class SkyListFilterComponent {
  @Input() public label: string;
  @Input() public type: string;
  @Input() public view: ListViewComponent;
  /* tslint:disable */
  @Input('filter') public filterFunction: (item: ListItemModel, filter: any) => boolean;
  @Input('template') public templateInput: TemplateRef<any>;
  @ContentChildren(TemplateRef) private templates: QueryList<TemplateRef<any>>;
  /* tslint:enable */

  public get template(): TemplateRef<any> {
    return this.templates.length > 0 ? this.templates.first : this.templateInput;
  }
}
