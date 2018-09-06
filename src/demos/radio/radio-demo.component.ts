import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  FormGroup
} from '@angular/forms';

@Component({
  selector: 'sky-radio-demo',
  templateUrl: './radio-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyRadioDemoComponent implements OnInit {
  public iconSelectedValue = 'info';
  public iconGroupSelectedValue = 'table';
  public radioForm: FormGroup;

  public seasons = [
    { name: 'Spring', disabled: false },
    { name: 'Summer', disabled: false },
    { name: 'Fall', disabled: true },
    { name: 'Winter', disabled: false }
  ];

  public favoriteSeason = this.seasons[1];

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.radioForm = this.formBuilder.group({
      favoriteSeason: this.seasons[0]
    });
  }
}
