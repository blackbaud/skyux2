import { Component, ViewChild } from '@angular/core';
import { SkyGridComponent } from '../grid.component';

@Component({
  selector: 'sky-test-cmp',
  template: require('./grid-empty.component.fixture.html')
})
export class GridEmptyTestComponent {
  @ViewChild(SkyGridComponent) public grid: SkyGridComponent;
}
