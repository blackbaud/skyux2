import { Component } from '@angular/core';

@Component({
  selector: 'sky-text-expand-demo',
  templateUrl: './text-expand-demo.component.html'
})
export class SkyTextExpandDemoComponent {
  // tslint:disable-next-line
  public shortText = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu';

  // tslint:disable-next-line
  public longText = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.\nAenean massa.\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\nDonec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.\nNulla consequat massa quis enim.\nDonec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.\nInteger tincidunt.\nCras dapibu';

  public repeaterData: string[] = [
    'Repeater item 1',
    'Repeater item 2',
    'Repeater item 3',
    'Repeater item 4',
    'Repeater item 5'
  ];
}
