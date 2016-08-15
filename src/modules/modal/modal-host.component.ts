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
import { SkyModalInstance } from './modal-instance';
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

  public open(modalInstance: SkyModalInstance, component: Type, providers?: any[]) {
    this.resolver.resolveComponent(component)
      .then((factory: ComponentFactory<any>) => {
        let hostService = new SkyModalHostService();

        providers = providers || [];

        providers.push({
          provide: SkyModalHostService,
          useValue: hostService
        });

        let resolvedProviders = ReflectiveInjector.resolve(providers);

        let injector = ReflectiveInjector.fromResolvedProviders(resolvedProviders, this.injector);

        let modalComponentRef = this.target.createComponent(factory, undefined, injector);

        modalInstance.componentInstance = modalComponentRef.instance;

        function closeModal() {
          hostService.destroy();
          modalComponentRef.destroy();
        }

        hostService.close.subscribe((modalComponent: SkyModalComponent) => {
          closeModal();
        });

        modalInstance.setCloseCallback(() => {
          closeModal();
        });
      });
  }
}
