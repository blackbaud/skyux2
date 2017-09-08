import { Component, Input } from '@angular/core';

@Component({
  selector: 'sky-sectioned-form-section',
  templateUrl: './sectioned-form-section.component.html',
  styleUrls: ['./sectioned-form-section.component.scss']
})
export class SkySectionedFormSectionComponent {

  @Input()
  public heading: string;

  @Input()
  public itemCount: number;

  @Input()
  public active: boolean;

}
