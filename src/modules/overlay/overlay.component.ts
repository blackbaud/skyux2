import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  // Renderer2,
  ViewChild
} from '@angular/core';

// import { Observable } from 'rxjs/Observable';
// import { Subject } from 'rxjs/Subject';
// import 'rxjs/add/observable/fromEvent';
// import 'rxjs/add/operator/debounceTime';

// import {
//   SkyWindowRefService
// } from '../window';

@Component({
  selector: 'sky-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class SkyOverlayComponent implements OnInit, OnDestroy {
  @ViewChild('target')
  public target: ElementRef;

  // private destroy = new Subject<boolean>();

  constructor(
    // private elementRef: ElementRef,
    // private renderer: Renderer2,
    // private windowRef: SkyWindowRefService
  ) { }

  public ngOnInit(): void {
    // const windowObj = this.windowRef.getWindow();

    // Observable
    //   .fromEvent(windowObj, 'resize')
    //   // .debounceTime(1500)
    //   .takeUntil(this.destroy)
    //   .subscribe(() => {
    //     this.renderer.setStyle(
    //       this.elementRef.nativeElement,
    //       'width',
    //       `${windowObj.document.body.clientWidth}px`
    //     );
    //     this.renderer.setStyle(
    //       this.elementRef.nativeElement,
    //       'height',
    //       `${windowObj.document.body.clientHeight}px`
    //     );
    //   });
  }

  public ngOnDestroy(): void {
    // this.destroy.next(true);
    // this.destroy.unsubscribe();
  }
}
