import { Component } from '@angular/core';

@Component({
    selector: 'sky-test-cmp',
    templateUrl: './help-inline.component.fixture.html'
})
export class HelpInlineTestComponent {
    public buttonIsClicked: boolean = false;

    public buttonClicked() {
        this.buttonIsClicked = true;
    }
}
