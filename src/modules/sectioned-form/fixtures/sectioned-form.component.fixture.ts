import { Component, ViewChild } from '@angular/core';
import { SkySectionedFormComponent } from '../sectioned-form.component';

@Component({
  selector: 'sky-sectioned-form-fixture',
  templateUrl: './sectioned-form.component.fixture.html'
})
export class SkySectionedFormFixtureComponent {

  @ViewChild(SkySectionedFormComponent)
  public sectionedForm: SkySectionedFormComponent;

  public activeTab: boolean = true;
}
