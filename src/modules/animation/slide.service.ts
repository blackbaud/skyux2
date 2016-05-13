import {ElementRef, Injectable} from '@angular/core';
// åimport {AnimationBuilder} from '@angular/animate';

@Injectable()
export class SkySlideService {
  // private autoHeightTimeoutId: any;

  // constructor(private animationBuilder: AnimationBuilder) {

  // }

  public slide(el: ElementRef, selector: string, direction: string, animate = false) {
    el.nativeElement.querySelector(selector).style.display = direction === 'up' ? 'none' : 'block';

    // clearTimeout(this.autoHeightTimeoutId);

    // let animateEl = el.nativeElement.querySelector(selector);
    // let animation = this.animationBuilder.css();
    // let duration = animate ? 250 : 0;

    // animation.setDuration(duration);

    // animateEl.removeAttribute('hidden');
    // animateEl.style.height = 'auto';
    // animateEl.style.display = 'block';

    // let height = animateEl.offsetHeight;

    // if (direction === 'up') {
    //   animation
    //     .setFromStyles({
    //       height: height + 'px',
    //       overflow: 'hidden'
    //     })
    //     .setToStyles({
    //       height: '0px'
    //     });
    // } else {
    //   animation
    //     .setFromStyles({
    //       height: '0px'
    //     })
    //     .setToStyles({
    //       height: height + 'px'
    //     });
    // }

    // animation.start(animateEl);

    // if (direction === 'down') {
    //   this.autoHeightTimeoutId = setTimeout(function () {
    //     animateEl.style.height = 'auto';
    //   }, duration + 50);
    // }
  }
}
