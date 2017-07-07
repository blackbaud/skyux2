import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { BrowserModule, By } from '@angular/platform-browser';

import { InlineHelpTestComponent } from './fixtures/inline-help.component.fixture';
import { SkyInlineHelpModule } from '../inline-help/inline-help.module';
import { SkyResources } from '../resources/resources';

describe('Inline help component', () => {
    let fixture: ComponentFixture<InlineHelpTestComponent>;
    let cmp: InlineHelpTestComponent;
    let el: HTMLElement;
    let debugElement: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                InlineHelpTestComponent
            ],
            imports: [
                BrowserModule,
                SkyInlineHelpModule
            ]
        });

        fixture = TestBed.createComponent(InlineHelpTestComponent);
        cmp = fixture.componentInstance as InlineHelpTestComponent;
        el = fixture.nativeElement as HTMLElement;
        debugElement = fixture.debugElement;

        fixture.detectChanges();
    });

    it('should emit a click event on button click', () => {
        debugElement.query(By.css('.sky-inline-help')).triggerEventHandler('click', undefined);
        fixture.detectChanges();
        expect(cmp.buttonIsClicked).toBe(true);
    });

    it('should have tabindex on the clickable area', () => {
    expect(debugElement.query(By.css('.sky-inline-help')).attributes['tabindex']).toBe('0');
  });
});
