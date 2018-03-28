import {
  Component,
  ContentChildren,
  OnInit,
  TemplateRef,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { SkyListViewGridComponent } from '../list-view-grid.component';

@Component({
  selector: 'sky-test-cmp',
  templateUrl: './list-view-grid.component.fixture.html'
})
export class ListViewGridTestComponent implements OnInit {
  public hiddenColumns: string[] = ['hiddenCol1', 'hiddenCol2'];
  public asyncHeading = new BehaviorSubject<string>('');

  @ViewChild(SkyListViewGridComponent)
  public grid: SkyListViewGridComponent;

  @ContentChildren(TemplateRef)
  public templates: QueryList<TemplateRef<any>>;

  @ViewChildren(TemplateRef)
  public viewtemplates: QueryList<TemplateRef<any>>;

  public searchFn: (data: any, searchText: string) => boolean;

  public ngOnInit() {
    setTimeout(() => {
      this.asyncHeading.next('Column1');
    }, 100);
  }
}
