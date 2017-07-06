import { Component, EventEmitter, Output } from '@angular/core'

@Component({
    selector: 'sky-inline-help',
    styleUrls: ['./inline-help.component.scss'],
    templateUrl: './inline-help.component.html'
})
export class SkyInlineHelpComponent {
    @Output()
    public actionClick = new EventEmitter<any>();

    public buttonClicked() {
        this.actionClick.emit();
    }

    public enterPress(event: KeyboardEvent) {
        if (event.which === 13) {
            this.actionClick.emit();
        }
    }
}