import {
  ApplicationRef,
  ElementRef,
  Injectable,
  Injector,
  ViewContainerRef
} from '@angular/core';

@Injectable()
export class SkyModalAdapterService {
  constructor(
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }

  public getModalHostViewContainer(injector: Injector): ViewContainerRef {
    let appViewContainerRef: ViewContainerRef = this.getRootComponent(injector).viewContainerRef;

    if (!appViewContainerRef) {
      throw new Error('The root application must expose a viewContainerRef property');
    }

    return appViewContainerRef;
  }

  public addHostEl(): void {
    document.body.appendChild(document.createElement('sky-modal-host'));
  }

  public remove(el: ElementRef): void {
    el.nativeElement.remove();
  }

  private getRootComponent(injector: Injector) {
    return injector.get(this.appRef.componentTypes[0]);
  }
}
