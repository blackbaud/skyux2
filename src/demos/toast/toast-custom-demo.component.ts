import { Component, OnInit } from '@angular/core';
import { SkyToastCustomComponent, SkyToastMessage } from '../../core';

@Component({
  selector: 'sky-toast-custom-demo',
  template: "<p>{{text}}<a *ngIf='!(message.isClosing | async)' href='http://example.com'>example.com</a></p>"
})
export class SkyToastCustomDemoComponent implements OnInit, SkyToastCustomComponent {
    public message: SkyToastMessage;
    public text: string = 'This is a templated message. It can even link you to '
    
    constructor() {
    }

    public ngOnInit() {
        this.message.isClosing.subscribe((value: boolean) => {
            if (value) {
                this.text = 'Bye bye :D';
            }
        });
    }
}