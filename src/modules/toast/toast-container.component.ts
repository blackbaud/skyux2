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
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyToastContainerComponent implements OnInit {

  public messages: Observable<any>;

  constructor(
    private toast: SkyToastService
  ) {}

  public ngOnInit() {
    this.messages = this.toast.messages;
  }
}
