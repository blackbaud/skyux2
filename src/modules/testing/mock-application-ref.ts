import {
  ApplicationRef,
  ComponentFactory,
  ComponentRef,
  Injectable,
  Injector,
  NgZone,
  Type
} from '@angular/core';

@Injectable()
export class MockApplicationRef extends ApplicationRef {
  public registerBootstrapListener(listener: (ref: ComponentRef<any>) => void): void {}

  public registerDisposeListener(dispose: () => void): void {}

  public bootstrap<C>(componentFactory: ComponentFactory<C>): ComponentRef<C> { return undefined; }

  public get injector(): Injector { return undefined; };

  public get zone(): NgZone { return undefined; };

  public run(callback: Function): any { return undefined; }

  public waitForAsyncInitializers(): Promise<any> { return undefined; }

  public dispose(): void {}

  public tick(): void {}

  public get componentTypes(): Type[] { return undefined; };

  public _loadComponent(componentRef: ComponentRef<any>): void {
      this._changeDetectorRefs.push(componentRef.changeDetectorRef);
      this.tick();
      this._rootComponents.push(componentRef);
      this._bootstrapListeners.forEach((listener: any) => listener(componentRef));
    }
}
