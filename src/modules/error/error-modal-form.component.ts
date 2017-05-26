import { Component } from '@angular/core';
import { ErrorModalConfig } from './error-modal-config';
import { SkyModalInstance } from '../modal/modal-instance';

@Component({
  selector: 'sky-error-modal-form',
  templateUrl: './error-modal-form.component.html',
  styleUrls: ['./error-modal-form.component.scss']
})
export class SkyErrorModalFormComponent {
  constructor(
    public context: ErrorModalConfig,
    public instance: SkyModalInstance) {}
}
