import { Component, Input, ComponentFactoryResolver, OnInit, ViewChild, RendererFactory2, Renderer2, EmbeddedViewRef, OnDestroy, ViewContainerRef } from '@angular/core';
import { SkyToastMessage, SkyToastCustomComponent } from '../types';
import { SkyCustomToastDirective } from '.';

@Component({
  selector: 'sky-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class SkyToastComponent implements OnInit, OnDestroy {
    @Input('message')
    public message: SkyToastMessage;
    
    @ViewChild(SkyCustomToastDirective)
    private customToastHost: SkyCustomToastDirective;

    private customElem: any;
    private renderer: Renderer2;
  
    constructor(
        private resolver: ComponentFactoryResolver,
        private rendererFactory: RendererFactory2
    ) {}

    public ngOnInit() {
        this.renderer = this.rendererFactory.createRenderer(this.customToastHost.viewContainerRef.element, undefined);
        if (this.message.customComponentType) {
            this.loadComponent();
        }
    }

    public ngOnDestroy() {
        if (this.customElem) {
            this.renderer.removeChild(this.customToastHost.viewContainerRef.element, this.customElem);
        }
    }

    private loadComponent() {
        let componentFactory = this.resolver.resolveComponentFactory(this.message.customComponentType);

        let viewContainerRef = this.customToastHost.viewContainerRef;
        viewContainerRef.clear();
    
        let componentRef = viewContainerRef.createComponent(componentFactory);
        (<SkyToastCustomComponent>componentRef.instance).message = this.message;

        this.customElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0];
        this.renderer.appendChild(viewContainerRef.element, this.customElem);
    }
}