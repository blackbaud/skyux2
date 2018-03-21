import {
  Component, OnInit, OnDestroy, ElementRef, Renderer2, Input, Output, EventEmitter
} from '@angular/core';
import { SkyResourcesService } from '../resources';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'sky-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss'],
  providers: [SkyResourcesService]
})
export class SkyInfiniteScrollComponent implements OnInit, OnDestroy {

  @Input('sky-infinite-scroll-has-more')
  public skyInfiniteScrollHasMore: boolean = true;

  @Output('sky-infinite-scroll-load')
  public skyInfiniteScrollLoad: EventEmitter<any> = new EventEmitter();

  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public loadMoreText: string = this.resources.getString('infinite_scroll_load_more');

  private scrollableParentEl: any;
  private scrollableParentIsWindow: boolean = false;
  private elementPosition: number;
  private turnOffScrollListener: () => void; 
  private turnOffResizeListener: () => void;

  public constructor(private element: ElementRef, private renderer: Renderer2, private resources: SkyResourcesService) {
  }

  public ngOnInit(): void {
    this.scrollableParentEl = this.getScrollableParent(this.element.nativeElement);
    this.elementPosition = this.element.nativeElement.offsetTop;
    this.turnOffScrollListener = this.renderer.listen(this.scrollableParentEl, 'scroll', () => {
      this.startInfiniteScrollLoad();
    });
    this.turnOffResizeListener = this.renderer.listen(this.scrollableParentEl, 'DOMNodeInserted', () => {
      if (this.isLoading.value && this.element.nativeElement.offsetTop != this.elementPosition) {
        this.elementPosition = this.element.nativeElement.offsetTop;
        this.isLoading.next(false);
      }
    })
  }

  public ngOnDestroy(): void {
    this.turnOffScrollListener();
    this.turnOffResizeListener();
  }

  public infiniteScrollInView() {
    if (this.scrollableParentIsWindow) {
      return this.scrollableParentEl.scrollY + this.scrollableParentEl.innerHeight > this.element.nativeElement.offsetTop;
    }
    else {
      return this.scrollableParentEl.scrollTop + this.scrollableParentEl.clientHeight > this.element.nativeElement.offsetTop;
    }
  }
  
  public startInfiniteScrollLoad() {
    if (this.skyInfiniteScrollHasMore && !this.isLoading.value && this.infiniteScrollInView()) {
        this.isLoading.next(true);
        this.skyInfiniteScrollLoad.emit([] as any[]);
    }
    else if (this.isLoading.value && this.element.nativeElement.offsetTop != this.elementPosition) {
      this.elementPosition = this.element.nativeElement.offsetTop;
      this.isLoading.next(false);
    }
  }

  private getScrollableParent(element: any): any {
    if (element.length <= 0 || element === document.body) {
      this.scrollableParentIsWindow = true;
      return window;
    }

    let parentEl = element.parentElement;
    if (parentEl.style['overflow-y'] === 'auto' || parentEl.style['overflow-y'] === 'scroll') {
      return parentEl;
    }

    return this.getScrollableParent(parentEl);
  }
}