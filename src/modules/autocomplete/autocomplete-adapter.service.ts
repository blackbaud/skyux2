import {
  ElementRef,
  Injectable,
  OnDestroy,
  Renderer2,
  RendererFactory2
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import {
  SkyWindowRefService
} from '../window';

@Injectable()
export class SkyAutocompleteAdapterService implements OnDestroy {
  private ngUnsubscribe = new Subject();
  private renderer: Renderer2;

  constructor(
    private rendererFactory: RendererFactory2,
    private windowRef: SkyWindowRefService
  ) {
    this.renderer = this.rendererFactory.createRenderer(undefined, undefined);
  }

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public watchDropdownWidth(elementRef: ElementRef): void {
    Observable
      .fromEvent(this.windowRef.getWindow(), 'resize')
      .takeUntil(this.ngUnsubscribe)
      .subscribe(() => {
        this.setDropdownWidth(elementRef);
      });

    this.windowRef.getWindow().setTimeout(() => {
      this.setDropdownWidth(elementRef);
    });
  }

  private setDropdownWidth(elementRef: ElementRef): void {
    const dropdownContainer = elementRef.nativeElement.querySelector('.sky-popover-container');
    const width = elementRef.nativeElement.getBoundingClientRect().width;
    this.renderer.setStyle(dropdownContainer, 'width', `${width}px`);
  }
}
