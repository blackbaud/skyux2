import {
  animate,
  Component,
  state,
  style,
  transition,
  trigger,
  ElementRef,
  AfterViewInit
} from '@angular/core';

import { SkyModalHostService } from './modal-host.service';
import { SkyModalConfiguation } from './modal-configuration';

import { SkyModalComponentAdapterService } from './modal-component-adapter.service';

@Component({
  selector: 'sky-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('modalState', [
      state('in', style({ opacity: '1.0' })),
      state('out', style({ opacity: '0.0' })),
      transition('void => *', [
        style({ opacity: '0.0' }),
        animate(150)
      ]),
      transition('* => void', [
        animate(150, style({ opacity: '0.0' }))
      ])
    ])
  ],
  providers: [
    SkyModalComponentAdapterService
  ]
})
export class SkyModalComponent implements AfterViewInit {
  public modalState = 'in';

  public get modalZIndex() {
    return this.hostService.getModalZIndex();
  }

  public get modalFullPage() {
    return this.config.fullPage;
  }

  constructor(
    private hostService: SkyModalHostService,
    private config: SkyModalConfiguation,
    private elRef: ElementRef,
    private componentAdapter: SkyModalComponentAdapterService) { }

  public ngAfterViewInit() {
    this.componentAdapter.handleWindowChange(this.elRef);
  }

  public closeButtonClick() {
    this.hostService.onClose(this);
  }

  public windowResize() {
    this.componentAdapter.handleWindowChange(this.elRef);
  }
}
