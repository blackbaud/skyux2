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

@Component({
  selector: 'sky-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: []
})
export class SkyInfiniteScrollComponent implements OnInit, OnDestroy {

  @Input()
  public hasMore = true;

  @Output()
  public onLoad = new EventEmitter();

  public isLoading: BehaviorSubject<boolean>;

  private idle = new Subject();
  private elementPosition: number;
  private scrollableParentEl: any;

  public constructor(
    private element: ElementRef,
    private domAdapter: SkyInfiniteScrollDomAdapterService
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

    Observable.fromEvent(this.scrollableParentEl, 'DOMNodeInserted')
      .takeUntil(this.idle)
      .subscribe(() => {
        if (this.isLoading && this.element.nativeElement.offsetTop !== this.elementPosition) {
          this.elementPosition = this.element.nativeElement.offsetTop;
          this.isLoading.next(false);
        }
      });
  }

  public ngOnDestroy(): void {
    this.idle.next();
    this.idle.complete();
  }

  public startInfiniteScrollLoad() {
    if (
      this.hasMore &&
      !this.isLoading.value &&
      this.domAdapter.IsElementScrolledInView(this.element.nativeElement, this.scrollableParentEl)
    ) {
      this.isLoading.next(true);
      this.onLoad.emit([] as any[]);
    }
  }
}
