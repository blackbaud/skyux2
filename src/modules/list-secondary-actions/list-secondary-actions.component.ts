import {
  Component,
  TemplateRef,
  ViewChild,
  AfterContentInit,
  ChangeDetectorRef,
  OnInit,
  OnDestroy
} from '@angular/core';

import {
  ListStateDispatcher,
  ListToolbarItemModel
} from '../list/state';

import {
  SkyListSecondaryActionsService
} from './list-secondary-actions.service';
import { SkyMediaBreakpoints, SkyMediaQueryService } from '../media-queries';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sky-list-secondary-actions',
  templateUrl: './list-secondary-actions.component.html',
  styleUrls: ['./list-secondary-actions.component.scss'],
  providers: [
    SkyListSecondaryActionsService
  ]
})
export class SkyListSecondaryActionsComponent implements AfterContentInit, OnInit, OnDestroy {

  public dropdownHidden: boolean = false;
  public currentBreakpoint: SkyMediaBreakpoints;

  @ViewChild('secondaryActions')
  private secondaryActionsTemplate: TemplateRef<any>;

  private mediaQuerySubscription: Subscription;

  constructor(
    private dispatcher: ListStateDispatcher,
    private actionService: SkyListSecondaryActionsService,
    private mediaQueries: SkyMediaQueryService,
    private changeRef: ChangeDetectorRef
  ) {}

  public ngOnInit() {
    this.mediaQuerySubscription = this.mediaQueries.subscribe((newBreakpoint: SkyMediaBreakpoints) => {
      this.currentBreakpoint = newBreakpoint;
      this.changeRef.detectChanges();
    });
  }

  public ngAfterContentInit() {
    let secondaryActionItem = new ListToolbarItemModel(
      {
        id: 'secondary-actions',
        template: this.secondaryActionsTemplate,
        location: 'center'
      }
    );
    this.dispatcher.toolbarAddItems([
      secondaryActionItem
    ],
    0);

    this.actionService.secondaryActionsSubject.subscribe((count) => {
      this.dropdownHidden = count < 1;
    });
  }

  public ngOnDestroy() {
    if (this.mediaQuerySubscription) {
      this.mediaQuerySubscription.unsubscribe();
    }
  }

  public isSmallScreen() {
    return this.currentBreakpoint === SkyMediaBreakpoints.xs;
  }
}
