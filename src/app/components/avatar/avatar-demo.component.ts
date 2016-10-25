import { Component } from '@angular/core';

@Component({
  selector: 'sky-avatar-demo',
  templateUrl: './avatar-demo.component.html'
})
export class SkyAvatarDemoComponent {
  public name = 'Robert C. Hernandez';

  public showImage = true;

  public get src(): string {
    return this.showImage ? 'https://imgur.com/tBiGElW.png' : undefined;
  }
}
