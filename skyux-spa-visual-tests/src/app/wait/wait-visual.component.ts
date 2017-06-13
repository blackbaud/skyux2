import { Component } from '@angular/core';

@Component({
  selector: 'wait-visual',
  templateUrl: './wait-visual.component.html',
  styleUrls: ['./wait-visual.component.scss']
})
export class WaitVisualComponent {
  public isWaiting: boolean;
  public isFullPage: boolean;
  public isNonBlocking: boolean;
}
