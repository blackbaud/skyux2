import {
  Component,
  Input,
  ViewChild,
  OnInit,
  OnDestroy
} from '@angular/core';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { SkyVerticalTabComponent } from './../vertical-tabset/vertical-tab.component';
import { SkySectionedFormService } from './sectioned-form.service';

@Component({
  selector: 'sky-sectioned-form-section',
  templateUrl: './sectioned-form-section.component.html',
  providers: [SkySectionedFormService],
  styleUrls: ['./sectioned-form-section.component.scss']
})
export class SkySectionedFormSectionComponent implements OnInit, OnDestroy {

  @Input()
  public heading: string;

  @Input()
  public itemCount: number;

  @Input()
  public active: boolean;

  public fieldRequired: boolean;
  public fieldInvalid: boolean;

  @ViewChild(SkyVerticalTabComponent)
  public tab: SkyVerticalTabComponent;

  private ngUnsubscribe = new Subject();

  constructor(
    private sectionedFormService: SkySectionedFormService
  ) { }

  public ngOnInit() {
    this.sectionedFormService.requiredChange
      .takeUntil(this.ngUnsubscribe)
      .subscribe((required: boolean) => this.fieldRequired = required);

    this.sectionedFormService.invalidChange
      .takeUntil(this.ngUnsubscribe)
      .subscribe((invalid: boolean) => this.fieldInvalid = invalid);
  }

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
