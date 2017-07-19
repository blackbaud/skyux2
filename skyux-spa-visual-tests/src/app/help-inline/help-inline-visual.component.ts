import { Component } from '@angular/core';

@Component({
    selector: 'help-inline',
    templateUrl: './help-inline.component.html'
})
export class HelpInlineVisualComponent {
    public buttonIsClicked: boolean;

    public buttonClicked() {
        this.buttonIsClicked = true;
    }
}