import { Component, OnInit } from '@angular/core';
import { SkyToastService } from './toast.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'sky-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class SkyToastComponent implements OnInit {

  messages: Observable<any>;

  constructor(private toast: SkyToastService) { }

  ngOnInit() {
    this.messages = this.toast.getMessages
  }
}