import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { BrowserModule, By } from '@angular/platform-browser';

import { HelpInlineTestComponent } from './fixtures/help-inline.component.fixture';
import { SkyHelpInlineModule } from '../help-inline/help-inline.module';

describe('Help inline component', () => {
    let fixture: ComponentFixture<HelpInlineTestComponent>;
    let cmp: HelpInlineTestComponent;
    let el: HTMLElement;
    let debugElement: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                HelpInlineTestComponent
            ],
            imports: [
                BrowserModule,
                SkyHelpInlineModule
            ]
        });

        fixture = TestBed.createComponent(HelpInlineTestComponent);
        cmp = fixture.componentInstance as HelpInlineTestComponent;
        el = fixture.nativeElement as HTMLElement;
        debugElement = fixture.debugElement;

        fixture.detectChanges();
    });

    it('should emit a click event on button click', () => {
        debugElement.query(By.css('.sky-help-inline')).triggerEventHandler('click', undefined);
        fixture.detectChanges();
        expect(cmp.buttonIsClicked).toBe(true);
    });
});
