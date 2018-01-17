import {
  animate,
  Component,
  Input,
  state,
  style,
  transition,
  trigger,
  ElementRef,
  AfterViewInit,
  HostListener
} from '@angular/core';

let skyModalUniqueIdentifier: number = 0;

@Component({
  selector: 'sky-flyout',
  templateUrl: './flyout.component.html',
  styleUrls: ['./flyout.component.scss'],
  animations: [
    trigger('modalState', [
      state('in', style({ opacity: '1.0' })),
      state('out', style({ opacity: '0.0' })),
      transition('void => *', [
        style({ opacity: '0.0' }),
        animate(150)
      ]),
      transition('* => void', [
        animate(150, style({ opacity: '0.0' }))
      ])
    ])
  ],
  providers: [ ]
})
export class SkyFlyoutComponent {

  constructor( ) { }
}
