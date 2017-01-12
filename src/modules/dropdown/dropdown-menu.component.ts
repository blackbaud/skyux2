import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'sky-dropdown-menu',
  templateUrl: '../shared/simple-content.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class SkyDropdownMenuComponent implements OnInit {
  constructor(private el: ElementRef) {}

  public ngOnInit() {
    this.el.nativeElement.setAttribute('role', 'menu');
  }
}
