import { Component } from '@angular/core';

@Component({
  selector: 'sky-repeater-demo',
  templateUrl: './repeater-demo.component.html'
})
export class SkyRepeaterDemoComponent {
  public items: any[];
  public expandMode = 'single';
  public selectable = false;

  constructor() {
    this.items = [
      {
        title: 'Call Robert Hernandez',
        note: 'Robert recently gave a very generous gift.  We should call him to thank him.',
        status: 'Completed',
        statusType: 'success'
      },
      {
        title: 'Send invitation to Spring Ball',
        note: 'The Spring Ball is coming up soon.  Let\'s get those invitations out!',
        status: 'Past due',
        statusType: 'warning'
      }
    ];
  }

  public addItem() {
    let next = this.items.length + 1;
    this.items.push({
      title: 'New reminder ' + next,
      note: 'This is a new reminder',
      expanded: true,
      status: 'Active',
      statusType: 'info'
    });
  }

  public removeItem() {
    this.items.pop();
  }
}
