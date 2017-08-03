import {
  Component,
  Input,
  ElementRef,
  ViewChild,
  OnInit,
  ViewContainerRef,
  ContentChildren,
  QueryList
} from '@angular/core';

import { SkyVerticalTabsetService } from './vertical-tabset.service';
import { SkyVerticalTabsetItemComponent } from './vertical-tabset-item.component';

@Component({
  selector: 'sky-vertical-tabset',
  templateUrl: './vertical-tabset.component.html',
  styleUrls: ['./vertical-tabset.component.scss'],
  providers: [SkyVerticalTabsetService]
})
export class SkyVerticalTabsetComponent implements OnInit {

  @ViewChild('contentWrapper')
  public tabGroups: ElementRef;

  @ViewChild('skySideContent')
  public content: ElementRef;

  public tabContent: any;

  constructor(
    public viewContainerRef: ViewContainerRef,
    private tabsetService: SkyVerticalTabsetService) {}

  public ngOnInit() {
    this.tabContent =
      this.tabGroups.nativeElement.querySelectorAll('.sky-vertical-tabset-item-content');

    this.tabContent.forEach((contentEl: ElementRef) => {
      this.content.nativeElement.appendChild(contentEl);
    });
  }
}
