import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output
} from '@angular/core';

import { SkyTabsetService } from './tabset.service';

@Component({
  selector: 'sky-tab',
  template: require('./tab.component.html')
})
export class SkyTabComponent implements OnDestroy {
  @Input()
  public tabHeading: string;

  @Input()
  public active: boolean;

  public get allowClose(): boolean {
    return this.close.observers.length > 0;
  }

  @Output()
  public close = new EventEmitter<any>();

  constructor(private tabsetService: SkyTabsetService) { }

  public ngOnDestroy() {
    this.tabsetService.destroyTab(this);
  }
}
