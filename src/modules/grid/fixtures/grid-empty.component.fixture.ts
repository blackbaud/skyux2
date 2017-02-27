import {
  Component,
  ViewChild,
  TemplateRef
} from '@angular/core';
import { SkyGridComponent, SkyGridColumnModel } from '../';

@Component({
  selector: 'sky-test-cmp',
  template: require('./grid-empty.component.fixture.html')
})
export class GridEmptyTestComponent {
  @ViewChild(SkyGridComponent)
  public grid: SkyGridComponent;

  @ViewChild(TemplateRef)
  public template: TemplateRef<any>;

  public columns: Array<SkyGridColumnModel>;

  public data: any[] = [
    {
      id: '1',
      column1: '1',
      column2: 'Apple'
    },
    {
      id: '2',
      column1: '01',
      column2: 'Banana'
    }
  ];
}
