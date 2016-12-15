import { Component, ViewChild } from '@angular/core';
import { SkyListViewChecklistComponent } from '../list-view-checklist.component';

@Component({
  selector: 'sky-test-cmp',
  template: require('./list-view-checklist.component.fixture.html')
})
export class ListViewChecklistTestComponent {
  @ViewChild(SkyListViewChecklistComponent) public checklist: SkyListViewChecklistComponent;
}
