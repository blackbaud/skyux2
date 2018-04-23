import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  Renderer2,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { SkyInfiniteScrollDomAdapterService } from './infinite-scroll-dom-adapter.service';

@Component({
  selector: 'sky-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: []
})
export class SkyInfiniteScrollComponent implements OnInit, OnDestroy {

  @Input('hasMore')
  public hasMore = true;

  @Output('onLoad')
  public onLoad = new EventEmitter();

  public _isLoading: BehaviorSubject<boolean>;
  public isLoading: Observable<boolean>;

  private elementPosition: number;
  private scrollableParentEl: any;
  private turnOffScrollListener: () => void;
  private turnOffResizeListener: () => void;

  public constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private domAdapter: SkyInfiniteScrollDomAdapterService
  ) {
    this._isLoading = new BehaviorSubject(false);
    this.isLoading = this._isLoading.asObservable();
  }

  public ngOnInit(): void {
    this.scrollableParentEl = this.getScrollableParent(this.element.nativeElement);
    this.elementPosition = this.element.nativeElement.offsetTop;
    this.turnOffScrollListener = this.renderer.listen(this.scrollableParentEl, 'scroll', () => {
      this.startInfiniteScrollLoad();
    });
    this.turnOffResizeListener = this.renderer.listen(this.scrollableParentEl, 'DOMNodeInserted', () => {
      if (this._isLoading && this.element.nativeElement.offsetTop !== this.elementPosition) {
        this.elementPosition = this.element.nativeElement.offsetTop;
        this._isLoading.next(false);
      }
    });
  }

  public ngOnDestroy(): void {
    this.turnOffScrollListener();
    this.turnOffResizeListener();
  }

  public startInfiniteScrollLoad() {
    if (
      this.hasMore &&
      !this._isLoading.value &&
      this.domAdapter.IsElementScrolledInView(this.element.nativeElement, this.scrollableParentEl)
    ) {
      this._isLoading.next(true);
      this.onLoad.emit([] as any[]);
    }
  }

  private getScrollableParent(element: any): any {
    if (element.length <= 0 || element === document.body) {
      return window;
    }

    let parentEl = element.parentElement;
    if (parentEl.style['overflow-y'] === 'auto' || parentEl.style['overflow-y'] === 'scroll') {
      return parentEl;
    }

    return this.getScrollableParent(parentEl);
  }
}
