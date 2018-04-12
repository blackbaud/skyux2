import { Component, OnInit } from '@angular/core';
import { SkyToastCustomComponent, SkyToastMessage } from '../../../modules/toast/toast.module';

@Component({
  selector: 'sky-toast-custom-demo',
  templateUrl: './toast-custom-demo.component.html',
  styleUrls: ['./toast-custom-demo.component.scss'],
})
export class SkyToastCustomDemoComponent implements OnInit, SkyToastCustomComponent {
    public message: SkyToastMessage;
    public text: string = 'This is a templated message. Look how pink it is!'
    
    constructor() {
        console.log('custom component constructed.');
    }

    public ngOnInit() {
        console.log('custom component drawn.');
        console.log(this.message);
        this.message.isClosing.subscribe((value: boolean) => {
            if (value) {
                this.text = 'Bye bye :D';
            }
        });
    }
}