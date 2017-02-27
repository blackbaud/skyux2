import {
  Component, ViewChild, TemplateRef, ContentChildren, QueryList, ViewChildren
} from '@angular/core';
import { SkyListViewGridComponent } from '../list-view-grid.component';

@Component({
  selector: 'sky-test-cmp',
  template: require('./list-view-grid.component.fixture.html')
})
export class ListViewGridTestComponent {
  public hiddenColumns: Array<string> = ['hiddenCol1', 'hiddenCol2'];
  @ViewChild(SkyListViewGridComponent)
  public grid: SkyListViewGridComponent;
  @ContentChildren(TemplateRef)
  public templates: QueryList<TemplateRef<any>>;
  @ViewChildren(TemplateRef)
  public viewtemplates: QueryList<TemplateRef<any>>;

  public searchFn: (data: any, searchText: string) => boolean;
}
