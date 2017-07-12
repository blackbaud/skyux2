import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'sky-confirmation-dialogue',
    templateUrl: './confirmation-dialogue.component.html',
    styleUrls: ['./confirmation-dialogue.component.scss']
})
export class SkyConfirmationDialogueComponent {
    private _context: string;

    @Input()
    public context(value: string){
        this._context = value;
    }

    @Output()
    public confirm = new EventEmitter<any>();

    @Output()
    public cancel = new EventEmitter<any>();

    public confirmClicked() {
        this.confirm.emit();
    }

    public cancelClicked() {
        this.cancel.emit();
    }
}