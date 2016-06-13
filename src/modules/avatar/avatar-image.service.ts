import { ElementRef, Injectable } from '@angular/core';

@Injectable()
export class SkyAvatarImageService {
  public updateImage(elementRef: ElementRef, src: string) {
    let el = elementRef.nativeElement;

    if (el) {
      let imageEl = el.querySelector('.sky-avatar-image');

      if (imageEl) {
        imageEl.style.backgroundImage = src ? 'url(' + src + ')' : '';
      }
    }
  }
}
