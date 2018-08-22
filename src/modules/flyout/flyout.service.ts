import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Type
} from '@angular/core';

import 'rxjs/add/operator/take';

import { SkyFlyoutAdapterService } from './flyout-adapter.service';
import { SkyFlyoutComponent } from './flyout.component';
import { SkyFlyoutInstance } from './flyout-instance';

import {
  SkyFlyoutConfig,
  SkyFlyoutMessage,
  SkyFlyoutMessageType
} from './types';
import { SkyWindowRefService } from '../window';

@Injectable()
export class SkyFlyoutService {
  private host: ComponentRef<SkyFlyoutComponent>;
  private removeAfterClosed = false;
  private isOpening: boolean = false;

  constructor(
    private adapter: SkyFlyoutAdapterService,
    private appRef: ApplicationRef,
    private injector: Injector,
    private resolver: ComponentFactoryResolver,
    private windowRef: SkyWindowRefService
  ) {
    // @HostListner doesn't work with services, so we revert to listening to the window.
    this.windowRef.getWindow().addEventListener('click', (event) => {
      if (this.host && !this.host.location.nativeElement.contains(event.target)) {
        this.close();
      }
    });
  }

  public open<T>(component: Type<T>, config?: SkyFlyoutConfig): SkyFlyoutInstance<T> {
    this.isOpening = true;
    if (!this.host) {
      this.host = this.createHostComponent();
    }

    const flyout = this.host.instance.attach(component, config);

    this.addListeners(flyout);

    return flyout;
  }

  public close(): void {
    if (this.host && !this.isOpening) {
      this.removeAfterClosed = true;
      this.host.instance.messageStream.next({
        type: SkyFlyoutMessageType.Close
      });
    }

    // Always reset the isOpening flag, as close() will be called on every click.
    this.isOpening = false;
  }

  private createHostComponent(): ComponentRef<SkyFlyoutComponent> {
    const componentRef = this.resolver
      .resolveComponentFactory(SkyFlyoutComponent)
      .create(this.injector);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0];

    this.appRef.attachView(componentRef.hostView);
    this.adapter.appendToBody(domElem);

    return componentRef;
  }

  private removeHostComponent() {
    if (this.host) {
      this.appRef.detachView(this.host.hostView);
      this.host.destroy();
      this.host = undefined;
    }

    this.adapter.removeHostElement();
  }

  private addListeners<T>(flyout: SkyFlyoutInstance<T>): void {
    this.removeAfterClosed = false;

    this.host.instance.messageStream
      .take(1)
      .subscribe((message: SkyFlyoutMessage) => {
        if (message.type === SkyFlyoutMessageType.Close) {
          this.removeAfterClosed = true;
        }
      });

    flyout.closed.take(1).subscribe(() => {
      if (this.removeAfterClosed) {
        this.removeHostComponent();
      }
    });
  }
}
