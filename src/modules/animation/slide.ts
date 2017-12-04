import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';

const skySlide = trigger('slide', [
  state('down', style({
    overflow: 'hidden',
    height: '*'
  })),
  state('up', style({
    overflow: 'hidden',
    height: 0
  })),
  transition(
    'up <=> down',
    animate('150ms ease-in')
  )
]);

export {
  skySlide
};
