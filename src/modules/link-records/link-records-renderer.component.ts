import {
  Component,
  Input,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core';
import { LinkRecordsMatchModel } from './state/matches/match.model';
import { LinkRecordsApi } from './link-records-api';

@Component({
  selector: 'sky-link-records-renderer',
  template: '<ng-template #container></ng-template>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyLinkRecordsRendererComponent implements OnInit {
  @Input() public item: any;
  @Input() public match: LinkRecordsMatchModel;
  @Input() public fields: Array<any>;
  @Input() public template: TemplateRef<any>;
  @ViewChild('container', { read: ViewContainerRef }) public container: ViewContainerRef;

  constructor(public api: LinkRecordsApi) {}

  public ngOnInit() {
    /* istanbul ignore else */
    if (this.template !== undefined) {
      this.container.createEmbeddedView(this.template, this);
    }
  }
}
