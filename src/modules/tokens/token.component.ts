import {
  ChangeDetectionStrategy,
  Component,
  ElementRef
} from '@angular/core';

// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/fromEvent';

@Component({
  selector: 'sky-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyTokenComponent {
  constructor(
    private elementRef: ElementRef
  ) {
    // Observable
    //   .fromEvent(this.elementRef.nativeElement, 'keyup')
    //   .subscribe((event: KeyboardEvent) => {
    //     const key = event.key.toLowerCase();
    //     if (key === 'delete' || key === 'backspace') {
    //       event.preventDefault();
    //     }
    //   });
  }

  public focusElement() {
    this.elementRef.nativeElement.focus();
  }

  // public removeToken(token: any) {
  //   this.tokens = this.tokens.filter(t => t !== token);
  //   console.log('removeToken() tokens?', this.tokens);
  //   this.changes.emit({
  //     tokens: this.tokens
  //   });
  // }
}
