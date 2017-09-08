import {
  Component,
  Input,
  ViewChild
} from '@angular/core';

import { SkyVerticalTabComponent } from './../vertical-tabset/vertical-tab.component';

@Component({
  selector: 'sky-sectioned-form-section',
  templateUrl: './sectioned-form-section.component.html',
  styleUrls: ['./sectioned-form-section.component.scss']
})
export class SkySectionedFormSectionComponent {

  @Input()
  public heading: string;

  @Input()
  public itemCount: number;

  @Input()
  public active: boolean;

  public fieldRequired: boolean;

  @ViewChild(SkyVerticalTabComponent)
  public tab: SkyVerticalTabComponent;

  public index() {
    return this.tab ? this.tab.index : undefined;
  }
}
