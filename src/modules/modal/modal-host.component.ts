import {
  Component,
  ComponentFactoryResolver,
  ElementRef,
  Injector,
  ReflectiveInjector,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import { SkyModalAdapterService } from './modal-adapter.service';
import { SkyModalComponent } from './modal.component';
import { SkyModalInstance } from './modal-instance';
import { SkyModalHostService } from './modal-host.service';
import { SkyModalConfiguationInterface as IConfig }  from './modal.interface';
import { SkyModalConfiguation } from './modal-configuration';

@Component({
  selector: 'sky-modal-host',
  templateUrl: './modal-host.component.html',
  styleUrls: ['./modal-host.component.scss'],
  viewProviders: [SkyModalAdapterService]
})

export class SkyModalHostComponent {
  public get modalOpen() {
    return SkyModalHostService.openModalCount > 0;
  }

  public get backdropZIndex() {
    return SkyModalHostService.backdropZIndex;
  }


  @ViewChild('target', { read: ViewContainerRef })
  public target: ViewContainerRef;

  constructor(
    private resolver: ComponentFactoryResolver,
    private elRef: ElementRef,
    private viewContainer: ViewContainerRef,
    private adapter: SkyModalAdapterService,
    private injector: Injector
  ) { }


  public open(modalInstance: SkyModalInstance, component: any, config?: IConfig) {
    let params: IConfig = Object.assign({}, arguments[2]);
    let factory = this.resolver.resolveComponentFactory(component);
    let hostService = new SkyModalHostService();
    let adapter = this.adapter;

    params.providers.push({
      provide: SkyModalHostService,
      useValue: hostService
    });
    params.providers.push({
      provide: SkyModalConfiguation,
      useValue: params
    });

    adapter.setPageScroll(SkyModalHostService.openModalCount > 0);

    let providers = params.providers /* istanbul ignore next */ || [];
    let resolvedProviders = ReflectiveInjector.resolve(providers);
    let injector = ReflectiveInjector.fromResolvedProviders(resolvedProviders, this.injector);
    let modalComponentRef = this.target.createComponent(factory, undefined, injector);

    modalInstance.componentInstance = modalComponentRef.instance;

    function closeModal() {
      hostService.destroy();
      adapter.setPageScroll(SkyModalHostService.openModalCount > 0);
      modalComponentRef.destroy();
    }

    hostService.close.subscribe((modalComponent: SkyModalComponent) => {
      closeModal();
    });

    modalInstance.setCloseCallback(() => {
      closeModal();
    });
  }
}
