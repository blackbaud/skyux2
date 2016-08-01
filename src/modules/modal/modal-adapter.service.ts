import {
  ElementRef,
  Injectable,
  Injector
} from '@angular/core';

import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class SkyModalAdapterService {
  constructor(private injector: Injector) { }

  public appendToBody(el: ElementRef) {
    let document = this.injector.get(DOCUMENT);
    document.body.appendChild(el.nativeElement);
  }

  public remove(el: ElementRef) {
    el.nativeElement.remove();
  }
}
