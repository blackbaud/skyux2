import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  Injector,
  OnDestroy,
  ReflectiveInjector,
  TemplateRef,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import {
  NavigationStart,
  Router
} from '@angular/router';

import {
  Subject
} from 'rxjs/Subject';

import 'rxjs/add/operator/takeUntil';

import {
  SkyOverlayConfig
} from './overlay-config';

import {
  SkyOverlayInstance
} from './overlay-instance';

@Component({
  selector: 'sky-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyOverlayComponent implements OnDestroy {
  @ViewChild('backdrop')
  private backdropRef: TemplateRef<any>;

  @ViewChild('target', { read: ViewContainerRef })
  private targetRef: ViewContainerRef;

  private ngUnsubscribe = new Subject<void>();

  constructor(
    private changeDetector: ChangeDetectorRef,
    private injector: Injector,
    private resolver: ComponentFactoryResolver,
    private router: Router
  ) { }

  public attach<T>(component: Type<T>, config?: SkyOverlayConfig): SkyOverlayInstance<T> {
    const defaults: SkyOverlayConfig = {
      keepAfterNavigationChange: false,
      showBackdrop: false
    };
    const settings = Object.assign(defaults, config);

    const overlayInstance = new SkyOverlayInstance<T>();
    const defaultProviders: any[] = [{
      provide: SkyOverlayInstance,
      useValue: overlayInstance
    }];

    settings.providers = defaultProviders.concat(config && config.providers || []);

    const factory = this.resolver.resolveComponentFactory(component);
    const providers = ReflectiveInjector.resolve(settings.providers);
    const injector = ReflectiveInjector.fromResolvedProviders(providers, this.injector);
    const componentRef = this.targetRef.createComponent(factory, undefined, injector);

    let backdropRef: EmbeddedViewRef<any>;
    if (settings.showBackdrop) {
      const index = this.targetRef.indexOf(componentRef.hostView);
      backdropRef = this.targetRef.createEmbeddedView(this.backdropRef, undefined, index);
    }

    this.router.events
      .takeUntil(overlayInstance.destroyStream)
      .subscribe(event => {
        if (event instanceof NavigationStart) {
          if (settings.keepAfterNavigationChange) {
            settings.keepAfterNavigationChange = false;
          } else {
            overlayInstance.destroy();
          }
        }
      });

    overlayInstance.componentInstance = componentRef.instance;
    overlayInstance.destroyStream.subscribe(() => {
      componentRef.destroy();
      if (backdropRef) {
        backdropRef.destroy();
      }
    });

    this.changeDetector.markForCheck();

    return overlayInstance;
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
