import { Component, Input } from '@angular/core';

@Component({
  selector: 'sky-list-toolbar-sort',
  template: ''
})
export class SkyListToolbarSortComponent {
  @Input() public label: string;
  @Input('field') public field: string;
  @Input('type') public type: string;
}
