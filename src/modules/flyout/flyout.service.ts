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
  private closeOnClickEvent: EventListener;

  constructor(
    private adapter: SkyFlyoutAdapterService,
    private appRef: ApplicationRef,
    private injector: Injector,
    private resolver: ComponentFactoryResolver,
    private windowRef: SkyWindowRefService
  ) {
    this.closeOnClickEvent = (event) => {
      if (this.host && !this.host.location.nativeElement.contains(event.target)) {
        this.close();
      }
    };
  }

  public open<T>(component: Type<T>, config?: SkyFlyoutConfig): SkyFlyoutInstance<T> {
    // isOpening flag will prevent close() from firing when open() is also fired.
    this.isOpening = true;
    this.windowRef.getWindow().setTimeout(() => {
      this.isOpening = false;
    });

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
    if (this.host) {
      // Flyout should close when user clicks outside of flyout.
      this.windowRef.getWindow().addEventListener('click', this.closeOnClickEvent);

      this.removeAfterClosed = false;
      this.host.instance.messageStream
        .take(1)
        .subscribe((message: SkyFlyoutMessage) => {
          if (message.type === SkyFlyoutMessageType.Close) {
            this.removeAfterClosed = true;
            this.isOpening = false;
          }
        });

      flyout.closed.take(1).subscribe(() => {
        this.windowRef.getWindow().removeEventListener('click', this.closeOnClickEvent);
        if (this.removeAfterClosed) {
          this.removeHostComponent();
        }
      });
    }
  }
}
