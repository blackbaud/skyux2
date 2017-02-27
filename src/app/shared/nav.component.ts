import { Component } from '@angular/core';

@Component({
  selector: 'sky-demo-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class SkyDemoNavComponent {
  public navItems: any[] = [
    {
      title: 'Home',
      url: '/',
      exact: true
    },
    {
     title: 'Learn',
     url: '/learn'
    },
    {
      title: 'Components',
      url: '/components'
    }
  ];
}
