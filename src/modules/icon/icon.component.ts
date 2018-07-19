import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'sky-icon',
  templateUrl: './icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyIconComponent {
  @Input()
  public icon: string;

  @Input()
  public size: string;

  @Input()
  public fixedWidth: boolean = true;

  public get classList() {
    let list: string[] = [];
    list.push('fa-' + this.icon);
    list.push('fa-' + this.size);
    if (this.fixedWidth === true) {
      list.push('fa-fw');
    }
    return list;
  }
}
