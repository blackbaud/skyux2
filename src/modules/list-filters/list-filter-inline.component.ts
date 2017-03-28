import {
  Component,
  Input,
  ContentChildren,
  TemplateRef,
  QueryList,
  OnInit,
  EventEmitter
} from '@angular/core';

import { ListItemModel } from '../list/state';
import { ListViewComponent } from '../list/list-view.component';

@Component({
  selector: 'sky-list-filter-inline',
  template: '<ng-content></ng-content>'
})
export class SkyListFilterInlineComponent implements OnInit {
  @Input()
  public name: string;

  @Input()
  public value: any;

  /* tslint:disable */
  @Input('filter')
  public filterFunction: (item: ListItemModel, filter: any) => boolean;

  @Input('template')
  public templateInput: TemplateRef<any>;
  /* tslint:enable */

  public onChange: EventEmitter<any> = new EventEmitter<any>();

  @ContentChildren(TemplateRef)
  private templates: QueryList<TemplateRef<any>>;

  public ngOnInit() {
    if (this.name === undefined || this.name.length === 0) {
      throw new Error('Inline filter requires a name.');
    }
  }

  public get template(): TemplateRef<any> {
      return this.templates.length > 0 ? this.templates.first : this.templateInput;
  }
}
