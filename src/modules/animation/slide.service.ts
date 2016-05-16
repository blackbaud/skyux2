import { ElementRef, Injectable } from '@angular/core';
import { Animation } from '@angular/platform-browser/src/animate/animation';
import { AnimationBuilder } from '@angular/platform-browser/src/animate/animation_builder';

@Injectable()
export class SkySlideService {
  private currentAnimation: Animation;

  constructor(private animationBuilder: AnimationBuilder) {

  }

  public slide(el: ElementRef, selector: string, direction: string, animate = false) {
    let animateEl = el.nativeElement.querySelector(selector);

    animateEl.style.overflow = 'hidden';

    if (animate) {
      let animation = this.animationBuilder.css();

      animation.setDuration(250);

      animateEl.removeAttribute('hidden');

      animateEl.style.height = 'auto';
      animateEl.style.display = 'block';

      let currentHeight = animateEl.offsetHeight;

      let fromHeight: number;
      let toHeight: number;

      if (direction === 'up') {
        fromHeight = currentHeight;
        toHeight = 0;
      } else {
        fromHeight = 0;
        toHeight = currentHeight;
      }

      animation
        .setFromStyles({
          height: fromHeight + 'px'
        })
        .setToStyles({
          height: toHeight + 'px'
        });

      if (this.currentAnimation) {
        this.currentAnimation.handleAnimationCompleted();
      }

      this.currentAnimation = animation
        .start(animateEl)
        .onComplete(() => {
          this.currentAnimation = undefined;

          if (direction === 'up') {
            animateEl.style.display = 'none';
          } else {
            animateEl.style.height = 'auto';
          }
        });
    } else {
      if (direction === 'up') {
        animateEl.style.height = 0;
      } else {
        animateEl.style.height = 'auto';
      }
    }
  }
}
