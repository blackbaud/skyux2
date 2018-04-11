import { Component, Input, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { SkyToastMessage, SkyToastCustomComponent } from '../types';
import { SkyCustomToastDirective } from '.';

@Component({
  selector: 'sky-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class SkyToastComponent implements OnInit {
    @Input('message')
    public message: SkyToastMessage;
    
    @ViewChild(SkyCustomToastDirective)
    private customToastHost: SkyCustomToastDirective;

    constructor(
        private resolver: ComponentFactoryResolver
    ) { }

    public ngOnInit() {
        if (this.message.customComponentType) {
            this.loadComponent();
        }
    }

    private loadComponent() {
        let componentFactory = this.resolver.resolveComponentFactory(this.message.customComponentType);

        let viewContainerRef = this.customToastHost.viewContainerRef;
        viewContainerRef.clear();
    
        let componentRef = viewContainerRef.createComponent(componentFactory);
        (<SkyToastCustomComponent>componentRef.instance).message = this.message;
    }
}