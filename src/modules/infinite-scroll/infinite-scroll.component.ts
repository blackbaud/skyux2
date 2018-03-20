import {
  Component, OnInit, OnDestroy, ElementRef, Renderer2, Input, Output, EventEmitter, HostListener
} from '@angular/core';
import { SkyResourcesService } from '../resources';

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

  public isLoading: boolean = true;
  public turnOffScrollListener: () => void; 
  public loadMoreText: string = this.resources.getString('infinite_scroll_load_more');
  @HostListener('window:scroll', [])
  onScroll(){
    this.startInfiniteScrollLoad();
  }

  public scrollableParentEl: any;
  public scrollableParentIsWindow: boolean = false;

  public constructor(private element: ElementRef, private renderer: Renderer2, private resources: SkyResourcesService) {
  }

  public ngOnInit(): void {
    this.isLoading = false;
    this.scrollableParentEl = this.getScrollableParent(this.element.nativeElement);
    this.turnOffScrollListener = this.renderer.listen(this.element.nativeElement, 'scroll', (event) => {
      this.startInfiniteScrollLoad();
    });
  }

  public ngOnDestroy(): void {
    this.turnOffScrollListener();
  }

  public infiniteScrollInView() {
    if (this.scrollableParentIsWindow) {
      return this.scrollableParentEl.scrollY + this.scrollableParentEl.innerHeight > this.element.nativeElement.offsetTop;
    }
    else {
      return this.scrollableParentEl.scrollTop + this.scrollableParentEl.height > this.element.nativeElement.position.top;
    }
  }
  
  public callLoadCallback() {
    this.skyInfiniteScrollLoad.emit([] as any[]);
    this.loadComplete();
  }

  public startInfiniteScrollLoad() {
    if (this.skyInfiniteScrollHasMore && !this.isLoading && this.infiniteScrollInView()) {
        console.log('Loading');
        this.isLoading = true;
        
        this.callLoadCallback();
    }
  }

  private loadComplete(): void {
    this.isLoading = false;
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