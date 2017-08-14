import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'sky-help-inline',
    styleUrls: ['./help-inline.component.scss'],
    templateUrl: './help-inline.component.html'
})
export class SkyHelpInlineComponent {
    @Output()
    public actionClick = new EventEmitter<any>();

    public buttonClicked() {
        this.actionClick.emit();
    }
}
