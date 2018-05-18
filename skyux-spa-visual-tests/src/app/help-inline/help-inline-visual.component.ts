import { Component } from '@angular/core';

@Component({
    selector: 'help-inline-visual',
    templateUrl: './help-inline-visual.component.html'
})
export class HelpInlineVisualComponent {
    public buttonIsClicked: boolean;

    public buttonClicked(): void {
        this.buttonIsClicked = true;
    }
}
