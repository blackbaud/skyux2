import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output
} from '@angular/core';

import { SkyTabsetComponent } from './tabset.component';

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

  constructor(private tabset: SkyTabsetComponent) { }

  public ngOnDestroy() {
    this.tabset.removeTab(this);
  }
}
