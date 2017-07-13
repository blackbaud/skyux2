import { Component, Input } from '@angular/core';

@Component({
  selector: 'sky-vertical-tabset-header',
  templateUrl: './vertical-tabset-header.component.html',
  styleUrls: ['./vertical-tabset-header.component.scss']
})
export class SkyVerticalTabsetHeaderComponent {
  @Input()
  public title: string;

  public open: boolean = false;

  public clicked() {
    this.open = !this.open;
  }
}
