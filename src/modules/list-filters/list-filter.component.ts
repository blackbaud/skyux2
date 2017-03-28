/*import {
  Component,
  Input,
  ContentChildren,
  TemplateRef,
  QueryList,
  OnInit
} from '@angular/core';

import { ListItemModel } from '../list/state';
import { ListViewComponent } from '../list/list-view.component';

// This should change to inline filter probably
@Component({
  selector: 'sky-list-filter',
  template: '<ng-content></ng-content>'
})
export class SkyListFilterComponent implements OnInit {
  @Input()
  public name: string;

  @Input()
  public label: string;

  @Input()
  public type: string;

  @Input()
  public view: ListViewComponent;

  /* tslint:disable */
/*  @Input('filter')
  public filterFunction: (item: ListItemModel, filter: any) => boolean;

  @Input('template')
  public templateInput: TemplateRef<any>;
  /* tslint:enable */

 /* @ContentChildren(TemplateRef)
  private templates: QueryList<TemplateRef<any>>;

  public ngOnInit() {
    if (this.name === undefined || this.name.length === 0) {
      throw new Error('Sky List Filter requires a name.');
    }
  }

  public get template(): TemplateRef<any> {
    return this.templates.length > 0 ? this.templates.first : this.templateInput;
  }
}*/
