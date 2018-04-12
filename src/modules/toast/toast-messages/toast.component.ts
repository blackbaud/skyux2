import { Component, Input, ComponentFactoryResolver, OnInit, ViewChild, OnDestroy, ViewContainerRef, ReflectiveInjector, ComponentRef, Injector } from '@angular/core';
import { SkyToastMessage, SkyToastCustomComponent } from '../types';

@Component({
  selector: 'sky-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class SkyToastComponent implements OnInit, OnDestroy {
    @Input('message')
    public message: SkyToastMessage;
    
    @ViewChild('skytoastcustomtemplate', { read: ViewContainerRef })
    private customToastHost: ViewContainerRef;

    private customComponent: ComponentRef<SkyToastCustomComponent>;
  
    constructor(
        private resolver: ComponentFactoryResolver,
        private injector: Injector
    ) {}

    public ngOnInit() {
        if (this.message.customComponentType) {
            this.loadComponent();
        }
    }

    public ngOnDestroy() {
        if (this.customComponent) {
            this.customComponent.destroy();
        }
    }

    private loadComponent() {
        this.customToastHost.clear();

        let componentFactory = this.resolver.resolveComponentFactory(this.message.customComponentType);
        let providers = ReflectiveInjector.resolve(this.message.providers || []);

        let injector = ReflectiveInjector.fromResolvedProviders(providers, this.injector);

        this.customComponent = this.customToastHost.createComponent(componentFactory, undefined, injector);
        this.customComponent.instance.message = this.message;
    }
}