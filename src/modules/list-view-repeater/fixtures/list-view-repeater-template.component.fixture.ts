import { Component, ViewChild } from '@angular/core';
import { SkyListViewRepeaterComponent } from '../list-view-repeater.component';

@Component({
  selector: 'sky-test-cmp',
  template: require('./list-view-repeater-template.component.fixture.html')
})
export class ListViewRepeaterTestTemplateComponent {
  @ViewChild(SkyListViewRepeaterComponent) public repeater: SkyListViewRepeaterComponent;
}
