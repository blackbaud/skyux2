
import {
  TestBed
} from '@angular/core/testing';

import { BrowserModule } from '@angular/platform-browser';

import { BackgroundColorTestComponent } from './fixtures/background-color.component.fixture';
import { BackgroundColorModule } from '../background-color/background-color.module';

describe('Background Color component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        BackgroundColorTestComponent
      ],
      imports: [
        BrowserModule,
        BackgroundColorModule
      ]
    });
  });

    fit('should change the color to lavender', () => {
    let fixture = TestBed.createComponent(BackgroundColorTestComponent);
    let cmp = fixture.componentInstance as BackgroundColorTestComponent;
    let el = fixture.nativeElement as HTMLElement;

    cmp.testColor = 'lavender';

    fixture.detectChanges();

    let backgroundColEl = el.querySelector('.background-color') as HTMLElement;
    //console.log('getting style', backgroundColEl.style.backgroundColor);
    expect(backgroundColEl.style.backgroundColor).toBe('lavender');
    
  });
});
