import { Component } from '@angular/core';

@Component({
    selector: 'sky-validation-demo',
    templateUrl: './validation-demo.component.html'
})
export class SkyValidationDemoComponent {
    public emailValidator: string;
    public urlValidator: string;
}
