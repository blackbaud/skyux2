import {
  Component,
  OnDestroy,
  TemplateRef,
  ViewChild,
  AfterContentInit
} from '@angular/core';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import {
  ListStateDispatcher,
  ListToolbarItemModel
} from '../list/state';

import {
  SkyListSecondaryActionsService
} from './list-secondary-actions.service';

@Component({
  selector: 'sky-list-secondary-actions',
  templateUrl: './list-secondary-actions.component.html',
  styleUrls: ['./list-secondary-actions.component.scss'],
  providers: [
    SkyListSecondaryActionsService
  ]
})
export class SkyListSecondaryActionsComponent implements AfterContentInit, OnDestroy {
  public dropdownHidden: boolean = false;

  @ViewChild('secondaryActions')
  private secondaryActionsTemplate: TemplateRef<any>;

  private ngUnsubscribe = new Subject();

  constructor(
    private dispatcher: ListStateDispatcher,
    private actionService: SkyListSecondaryActionsService
  ) { }

  public ngAfterContentInit() {
    const secondaryActionItem = new ListToolbarItemModel({
      id: 'secondary-actions',
      template: this.secondaryActionsTemplate,
      location: 'right'
    });

    this.dispatcher.toolbarAddItems([ secondaryActionItem ], -1);

    this.actionService.secondaryActionsSubject
      .takeUntil(this.ngUnsubscribe)
      .subscribe((count) => {
        this.dropdownHidden = count < 1;
      });
  }

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
