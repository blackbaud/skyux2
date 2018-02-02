import {
  ChangeDetectorRef,
  Component
} from '@angular/core';

@Component({
  selector: 'sky-flyout-demo-internal',
  templateUrl: './flyout-demo-internal.component.html'
})
export class SkyFlyoutDemoInternalComponent {
  public get record(): string {
    return this._record;
  }

  public set record(value: string) {
    this._record = value;
    this.changeDetector.detectChanges();
  }

  private _record: string;

  constructor(
    private changeDetector: ChangeDetectorRef
  ) { }
}
