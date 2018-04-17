import { Component, OnInit } from '@angular/core';
import { SkyToastService } from './services/toast.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'sky-toast-container',
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.scss']
})
export class SkyToastContainerComponent implements OnInit {

  public messages: Observable<any>;

  constructor(private toast: SkyToastService) { }

  public ngOnInit() {
    this.messages = this.toast.getMessages;
  }
}
