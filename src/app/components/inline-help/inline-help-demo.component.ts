import { Component } from '@angular/core';

@Component({
    selector: 'sky-inline-help-demo',
    templateUrl: './inline-help-demo.component.html'
})
export class SkyInlineHelpDemoComponent {
    public givingActionClick() {
        alert('Giving inline help clicked');
    }

    public emailActionClick() {
        alert('enter email in format joe@abc.com');
    }
}