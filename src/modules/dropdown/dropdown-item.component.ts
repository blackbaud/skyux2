import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'sky-dropdown-item',
  templateUrl: './dropdown-item.component.html',
  styleUrls: ['./dropdown-item.component.scss']
})
export class SkyDropdownItemComponent implements OnInit {
  constructor(private el: ElementRef) {}

  public ngOnInit() {
    this.el.nativeElement.setAttribute('role', 'menuitem');
  }
}
