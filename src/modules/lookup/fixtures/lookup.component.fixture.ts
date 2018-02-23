import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup
} from '@angular/forms';

import { SkyLookupComponent } from '../lookup.component';

@Component({
  selector: 'sky-test-cmp',
  templateUrl: './lookup.component.fixture.html'
})
export class SkyLookupTestComponent implements OnInit {
  @ViewChild(SkyLookupComponent)
  public lookupComponent: SkyLookupComponent;

  public ariaLabel: string;
  public ariaLabelledBy: string;
  public friends: any[];
  public form: FormGroup;
  public placeholderText: string;

  public people: any[] = [
    { name: 'Andy' },
    { name: 'Beth' },
    { name: 'David' },
    { name: 'Frank' },
    { name: 'Isaac' },
    { name: 'John' },
    { name: 'Joyce' },
    { name: 'Lindsey' },
    { name: 'Mitch' },
    { name: 'Patty' },
    { name: 'Paul' },
    { name: 'Sally' },
    { name: 'Susan' },
    { name: 'Vanessa' },
    { name: 'Xavier' },
    { name: 'Yolanda' },
    { name: 'Zack' }
  ];

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.createForm();
  }

  public enableLookup() {
    this.form.controls.friends.enable();
  }

  public disableLookup() {
    this.form.controls.friends.disable();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      friends: new FormControl(this.friends)
    });
  }
}
