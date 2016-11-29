import {
  ApplicationRef,
  Injectable,
  Injector
} from '@angular/core';

@Injectable()
export class SkyModalAdapterService {
  constructor(
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }

  public addHostEl(): void {
    document.body.appendChild(document.createElement('sky-modal-host'));
  }

  public removeHostEl(): void {
    document.body.removeChild(document.querySelector('sky-modal-host'));
  }
}
