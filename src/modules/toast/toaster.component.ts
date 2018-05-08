import {
  Component,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';

import {
  Observable
} from 'rxjs';

import {
  SkyToastService
} from './services/toast.service';

@Component({
  selector: 'sky-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyToasterComponent implements OnInit {

  public toastInstances: Observable<any>;

  constructor(
    private toast: SkyToastService
  ) {}

  public ngOnInit() {
    this.toastInstances = this.toast.toastInstances;
  }
}
