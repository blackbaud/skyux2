import { Component } from '@angular/core';

@Component({
    selector: 'sky-inline-help-demo',
    templateUrl: './inline-help-demo.component.html'
})
export class SkyInlineHelpDemoComponent {
    public HelloActionClick() {
        alert('Hello inline help clicked');
    }
}