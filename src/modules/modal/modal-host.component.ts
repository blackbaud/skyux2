import {
  Component,
  ComponentFactory,
  ComponentResolver,
  ElementRef,
  Injector,
  ReflectiveInjector,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import { SkyModalAdapterService } from './modal-adapter.service';
import { SkyModalComponent } from './modal.component';
import { SkyModalHostService } from './modal-host.service';

@Component({
  selector: 'sky-modal-host',
  template: require('./modal-host.component.html'),
  styles: [require('./modal-host.component.scss')],
  viewProviders: [SkyModalAdapterService]
})
export class SkyModalHostComponent {
  public get modalOpen() {
    return SkyModalHostService.openModalCount > 0;
  }

  public get backdropZIndex() {
    return SkyModalHostService.backdropZIndex;
  }

  @ViewChild('target', {read: ViewContainerRef})
  private target: ViewContainerRef;

  constructor(
    private resolver: ComponentResolver,
    private elRef: ElementRef,
    private viewContainer: ViewContainerRef,
    private adapter: SkyModalAdapterService,
    private injector: Injector
  ) { }

  public init() {
    this.adapter.appendToBody(this.viewContainer.element);
  }

  public show(component: Type) {
    this.resolver.resolveComponent(component)
      .then((factory: ComponentFactory<any>) => {
        let hostService = new SkyModalHostService();

        let resolvedProviders = ReflectiveInjector.resolve(
          [
            {
              provide: SkyModalHostService,
              useValue: hostService
            }
          ]
        );

        let injector = ReflectiveInjector.fromResolvedProviders(resolvedProviders, this.injector);

        let modalComponentRef = this.target.createComponent(factory, undefined, injector);

        hostService.close.subscribe((modalComponent: SkyModalComponent) => {
          hostService.destroy();
          modalComponentRef.destroy();
        });
      });
  }
}
