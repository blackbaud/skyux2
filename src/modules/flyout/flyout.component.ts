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
      state('in', style({ transform: 'translateX(0)' })),
      state('out', style({ transform: 'translateX(100%)' })),
      transition('void => *', [
        style({ transform: 'translateX(100%)' }),
        animate(250)
      ]),
      transition('* => void', [
        animate(250, style({ transform: 'translateX(0)' }))
      ]),
      transition('in => out', animate('250ms ease-in')),
      transition('out => in', animate('250ms ease-in')),
    ])
  ],
  providers: [ ]
})
export class SkyFlyoutComponent {
  public modalState = 'in';

  constructor( ) { }

  public toggleState(state: string) {
    this.modalState = state;
    console.log(state);
  }
}
