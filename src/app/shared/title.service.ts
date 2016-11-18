import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable()
export class SkyDemoTitleService {
  constructor(private title: Title) { }

  public setTitle(...parts: string[]) {
    let windowTitle = 'SKY UX 2';

    if (parts && parts.length > 0) {
      parts.push(windowTitle);
      windowTitle = parts.join(' - ');
    }

    this.title.setTitle(windowTitle);
  }
}
