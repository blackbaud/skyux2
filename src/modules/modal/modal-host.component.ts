import {
  Component,
  ComponentFactoryResolver,
  Injector,
  OnDestroy,
  ReflectiveInjector,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { SkyModalAdapterService } from './modal-adapter.service';
import { SkyModalInstance } from './modal-instance';
import { SkyModalHostService } from './modal-host.service';
import { SkyModalConfigurationInterface as IConfig } from './modal.interface';
import { SkyModalConfiguration } from './modal-configuration';

@Component({
  selector: 'sky-modal-host',
  templateUrl: './modal-host.component.html',
  styleUrls: ['./modal-host.component.scss'],
  viewProviders: [SkyModalAdapterService]
})

export class SkyModalHostComponent implements OnDestroy {
  public get modalOpen() {
    return SkyModalHostService.openModalCount > 0;
  }

  public get backdropZIndex() {
    return SkyModalHostService.backdropZIndex;
  }

  @ViewChild('target', { read: ViewContainerRef })
  public target: ViewContainerRef;

  private ngUnsubscribe = new Subject();

  constructor(
    private resolver: ComponentFactoryResolver,
    private adapter: SkyModalAdapterService,
    private injector: Injector
  ) { }

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public open(modalInstance: SkyModalInstance, component: any, config?: IConfig) {
    let params: IConfig = Object.assign({}, config);
    let factory = this.resolver.resolveComponentFactory(component);
    let hostService = new SkyModalHostService(params.fullPage);
    let adapter = this.adapter;
    let modalOpener: HTMLElement = adapter.getModalOpener();

    params.providers.push({
      provide: SkyModalHostService,
      useValue: hostService
    });
    params.providers.push({
      provide: SkyModalConfiguration,
      useValue: params
    });

    adapter.setPageScroll(SkyModalHostService.openModalCount > 0);
    adapter.toggleFullPageModalClass(SkyModalHostService.fullPageModalCount > 0);

    let providers = params.providers /* istanbul ignore next */ || [];
    let resolvedProviders = ReflectiveInjector.resolve(providers);
    let injector = ReflectiveInjector.fromResolvedProviders(resolvedProviders, this.injector);
    let modalComponentRef = this.target.createComponent(factory, undefined, injector);

    modalInstance.componentInstance = modalComponentRef.instance;

    function closeModal() {
      hostService.destroy();
      adapter.setPageScroll(SkyModalHostService.openModalCount > 0);
      adapter.toggleFullPageModalClass(SkyModalHostService.fullPageModalCount > 0);
      /* istanbul ignore else */
      /* sanity check */
      if (modalOpener && modalOpener.focus) {
        modalOpener.focus();
      }
      modalComponentRef.destroy();
    }

    hostService.openHelp
      .takeUntil(this.ngUnsubscribe)
      .subscribe((helpKey?: string) => {
        modalInstance.openHelp(helpKey);
      });

    hostService.close
      .takeUntil(this.ngUnsubscribe)
      .subscribe(() => {
        modalInstance.close();
      });

    modalInstance.closed
      .takeUntil(this.ngUnsubscribe)
      .subscribe(() => {
        closeModal();
      });
  }
}
