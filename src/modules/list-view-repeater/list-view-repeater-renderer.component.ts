import {
  Component, Input, TemplateRef, ViewChild, ViewContainerRef, ChangeDetectionStrategy, OnInit
} from '@angular/core';
import { ListItemModel } from '../list/state/items/item.model';

@Component({
  selector: 'sky-list-view-repeater-renderer',
  template: '<template #container></template>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyListViewRepeaterRendererComponent implements OnInit {
  @Input() public item: ListItemModel;
  @Input() private template: TemplateRef<any>;
  @ViewChild('container', { read: ViewContainerRef }) private container: ViewContainerRef;

  public ngOnInit() {
    if (this.template !== undefined) {
      this.container.createEmbeddedView(this.template, this);
    }
  }

  get row() {
    return this.item.data;
  }
}
