import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import {
  BehaviorSubject,
  Observable,
  Subject
} from 'rxjs';

import {
  SkyInfiniteScrollDomAdapterService
} from './infinite-scroll-dom-adapter.service';
import { MutationObserverService } from '../mutation/mutation-observer-service';

@Component({
  selector: 'sky-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: []
})
export class SkyInfiniteScrollComponent implements OnInit, OnDestroy {

  @Input()
  public enabled = true;

  @Output()
  public scrollEnd = new EventEmitter();

  public isLoading: BehaviorSubject<boolean>;

  private idle = new Subject();
  private elementPosition: number;
  private scrollableParentEl: any;
  private childInsertedObserver: MutationObserver;

  public constructor(
    private element: ElementRef,
    private domAdapter: SkyInfiniteScrollDomAdapterService,
    private mutationService: MutationObserverService
  ) {
    this.isLoading = new BehaviorSubject<boolean>(false);
  }

  public ngOnInit(): void {
    this.scrollableParentEl = this.domAdapter.getScrollableParent(this.element.nativeElement);
    this.elementPosition = this.element.nativeElement.offsetTop;

    Observable.fromEvent(this.scrollableParentEl, 'scroll')
      .takeUntil(this.idle)
      .subscribe(() => {
        this.startInfiniteScrollLoad();
      });

    this.childInsertedObserver = this.mutationService.create((mutationRecords: MutationRecord[]) => {
      if (
        this.isLoading &&
        this.element.nativeElement.offsetTop !== this.elementPosition &&
        mutationRecords.filter(record => record.addedNodes.length > 0)
      ) {
        this.elementPosition = this.element.nativeElement.offsetTop;
        this.isLoading.next(false);
      }
    });

    let observedParent = this.domAdapter.isWindow(this.scrollableParentEl) ? document.body : this.scrollableParentEl;
    this.childInsertedObserver.observe(observedParent, {childList: true, subtree: true});
    console.log(this.scrollableParentEl);
  }

  public ngOnDestroy(): void {
    this.childInsertedObserver.disconnect();
    this.idle.next();
    this.idle.complete();
  }

  public startInfiniteScrollLoad() {
    if (
      this.enabled &&
      !this.isLoading.value &&
      this.domAdapter.IsElementScrolledInView(this.element.nativeElement, this.scrollableParentEl)
    ) {
      this.isLoading.next(true);
      this.scrollEnd.emit([] as any[]);
    }
  }
}
