import { Component } from '@angular/core';

@Component({
  selector: 'sky-error',
  styleUrls: ['./error.component.scss'],
  templateUrl: './error.component.html'
})
export class SkyErrorComponent {
  public title: string = 'Sorry, something went wrong.';
  public description: string = 'Try to refresh this page or come back later.';
  public actionText: string = 'Refresh';
}
