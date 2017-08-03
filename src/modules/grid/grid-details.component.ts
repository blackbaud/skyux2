import {
  Component,
  Input,
  ViewChild,
  ViewContainerRef,
  TemplateRef,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  ListItemModel
} from '../list/state/items/item.model';

@Component({
  selector: 'sky-grid-details',
  template: '<ng-template #details></ng-template>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyGridDetailsComponent implements OnInit {
  @Input()
  public item: ListItemModel;

  @Input()
  private template: TemplateRef<any>;

  @ViewChild('details', { read: ViewContainerRef })
  private container: ViewContainerRef;

  public ngOnInit() {
    this.container.createEmbeddedView(this.template, this);
  }

  get row() {
    return this.item.data;
  }

}
