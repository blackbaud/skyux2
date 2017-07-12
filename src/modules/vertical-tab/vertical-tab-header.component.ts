import { Component, Input } from '@angular/core';

@Component({
  selector: 'sky-vertical-tab-header',
  templateUrl: './vertical-tab-header.component.html',
  styleUrls: ['./vertical-tab-header.component.scss']
})
export class SkyVerticalTabHeaderComponent {
  @Input()
  public title: string;

  public open: boolean = false;

  public clicked() {
    this.open = !this.open;
  }
}
