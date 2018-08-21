import {
  fakeAsync,
  TestBed,
  ComponentFixture,
  tick
} from '@angular/core/testing';

import {
  SkyResourcesModule
} from '../resources';

import {
  SkyProgressIndicatorModule,
  SkyProgressIndicatorMessageType
} from '.';
import {
  ProgressIndicatorTestComponent
} from './fixtures/progress-indicator.component.fixture';

describe('Progress indicator component', function () {

  let fixture: ComponentFixture<ProgressIndicatorTestComponent>;
  let componentInstance: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkyProgressIndicatorModule,
        SkyResourcesModule
      ],
      declarations: [
        ProgressIndicatorTestComponent
      ]
    });

    fixture = TestBed.createComponent(ProgressIndicatorTestComponent);
  });

  it('should use horizontal mode if set', fakeAsync(() => {
    fixture.componentInstance.isHorizontal = true;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    componentInstance = fixture.componentInstance.progressIndicator;
    let element = fixture.nativeElement;

    expect(componentInstance.isHorizontal).toBeTruthy();
    for (let item of componentInstance.progressItems.toArray()) {
      expect(item.isHorizontal).toBeTruthy();
    }

    expect(element.querySelector('.sky-progress-indicator-display')).toBeTruthy();
    expect(element.querySelector('.sky-progress-indicator-item-step')).toBeFalsy();
  }));

  describe('standard setup', () => {
    beforeEach(fakeAsync(() => {
      fixture.detectChanges();
      tick();
      componentInstance = fixture.componentInstance.progressIndicator;
    }));

    it('should use vertical mode by default', fakeAsync(() => {
      let element = fixture.nativeElement;

      expect(componentInstance.isHorizontal).toBeFalsy();
      for (let item of componentInstance.progressItems.toArray()) {
        expect(item.isHorizontal).toBeFalsy();
      }

      expect(element.querySelector('.sky-progress-indicator-display')).toBeFalsy();
      expect(element.querySelector('.sky-progress-indicator-item-step')).toBeTruthy();
    }));

    it('should advance progress and complete current item when a complete message is received.', () => {
      expect(componentInstance.activeIndex).toBe(0);
      expect(componentInstance.progressItems.first.isActive).toBeTruthy();
      expect(componentInstance.progressItems.first.isComplete).toBeFalsy();

      componentInstance.messageStream.next(SkyProgressIndicatorMessageType.ItemComplete);
      fixture.detectChanges();

      expect(componentInstance.activeIndex).toBe(1);
      expect(componentInstance.progressItems.first.isActive).toBeFalsy();
      expect(componentInstance.progressItems.first.isComplete).toBeTruthy();

      expect(componentInstance.progressItems.toArray()[1].isActive).toBeTruthy();
      expect(componentInstance.progressItems.toArray()[1].isComplete).toBeFalsy();
    });

    it('should not advance once past the final step', () => {
      componentInstance.messageStream.next(SkyProgressIndicatorMessageType.ItemComplete);
      fixture.detectChanges();
      componentInstance.messageStream.next(SkyProgressIndicatorMessageType.ItemComplete);
      fixture.detectChanges();
      componentInstance.messageStream.next(SkyProgressIndicatorMessageType.ItemComplete);
      fixture.detectChanges();

      expect(componentInstance.activeIndex).toBe(3);
      expect(componentInstance.progressItems.last.isActive).toBeFalsy();
      expect(componentInstance.progressItems.last.isComplete).toBeTruthy();

      componentInstance.messageStream.next(SkyProgressIndicatorMessageType.ItemComplete);
      fixture.detectChanges();

      expect(componentInstance.activeIndex).toBe(3);
    });

    it('should not regress when on the first step', () => {
      expect(componentInstance.activeIndex).toBe(0);
      expect(componentInstance.progressItems.first.isActive).toBeTruthy();
      expect(componentInstance.progressItems.first.isComplete).toBeFalsy();

      componentInstance.messageStream.next(SkyProgressIndicatorMessageType.ItemIncomplete);
      fixture.detectChanges();

      expect(componentInstance.activeIndex).toBe(0);
      expect(componentInstance.progressItems.first.isActive).toBeTruthy();
      expect(componentInstance.progressItems.first.isComplete).toBeFalsy();
    });

    it('should leave completed tasks marked as such when regressing progress', () => {
      componentInstance.messageStream.next(SkyProgressIndicatorMessageType.ItemComplete);
      fixture.detectChanges();
      componentInstance.messageStream.next(SkyProgressIndicatorMessageType.ItemComplete);
      fixture.detectChanges();

      expect(componentInstance.progressItems.first.isComplete).toBeTruthy();
      expect(componentInstance.progressItems.first.isActive).toBeFalsy();

      expect(componentInstance.progressItems.toArray()[1].isComplete).toBeTruthy();
      expect(componentInstance.progressItems.toArray()[1].isActive).toBeFalsy();

      expect(componentInstance.progressItems.last.isComplete).toBeFalsy();
      expect(componentInstance.progressItems.last.isActive).toBeTruthy();

      componentInstance.messageStream.next(SkyProgressIndicatorMessageType.ItemIncomplete);
      fixture.detectChanges();
      componentInstance.messageStream.next(SkyProgressIndicatorMessageType.ItemIncomplete);
      fixture.detectChanges();

      expect(componentInstance.progressItems.first.isComplete).toBeTruthy();
      expect(componentInstance.progressItems.first.isActive).toBeTruthy();

      expect(componentInstance.progressItems.toArray()[1].isComplete).toBeTruthy();
      expect(componentInstance.progressItems.toArray()[1].isActive).toBeFalsy();

      expect(componentInstance.progressItems.last.isComplete).toBeFalsy();
      expect(componentInstance.progressItems.last.isActive).toBeFalsy();
    });

    it('should reset progress when a reset progress message is passed', () => {
      componentInstance.messageStream.next(SkyProgressIndicatorMessageType.ItemComplete);
      fixture.detectChanges();
      componentInstance.messageStream.next(SkyProgressIndicatorMessageType.ItemComplete);
      fixture.detectChanges();

      expect(componentInstance.progressItems.first.isComplete).toBeTruthy();
      expect(componentInstance.progressItems.first.isActive).toBeFalsy();

      expect(componentInstance.progressItems.toArray()[1].isComplete).toBeTruthy();
      expect(componentInstance.progressItems.toArray()[1].isActive).toBeFalsy();

      expect(componentInstance.progressItems.last.isComplete).toBeFalsy();
      expect(componentInstance.progressItems.last.isActive).toBeTruthy();

      componentInstance.messageStream.next(SkyProgressIndicatorMessageType.ProgressReset);
      fixture.detectChanges();

      expect(componentInstance.progressItems.first.isComplete).toBeFalsy();
      expect(componentInstance.progressItems.first.isActive).toBeTruthy();

      expect(componentInstance.progressItems.toArray()[1].isComplete).toBeFalsy();
      expect(componentInstance.progressItems.toArray()[1].isActive).toBeFalsy();

      expect(componentInstance.progressItems.last.isComplete).toBeFalsy();
      expect(componentInstance.progressItems.last.isActive).toBeFalsy();
    });

    it('should throw an error when an unknown message is passed', () => {
      try {
        componentInstance.messageStream.next(4);
        fail('Should have thrown an exception.');
      } catch (e) {
        expect(e).toBe('SkyProgressIndicatorMessageType unrecognized.');
      }
    });
  });

  describe('progress indicator nav buttons', () => {
    it('should be able to control progress', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      componentInstance = fixture.componentInstance.progressIndicator;
      let debugElement = fixture.nativeElement;
      let buttons = debugElement.querySelectorAll('sky-progress-indicator-nav-button button');

      // next button
      buttons[1].click();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(componentInstance.activeIndex).toBe(1);
      expect(componentInstance.progressItems.first.isActive).toBeFalsy();
      expect(componentInstance.progressItems.first.isComplete).toBeTruthy();

      expect(componentInstance.progressItems.toArray()[1].isActive).toBeTruthy();
      expect(componentInstance.progressItems.toArray()[1].isComplete).toBeFalsy();

      // previous button
      buttons[0].click();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(componentInstance.activeIndex).toBe(0);
      expect(componentInstance.progressItems.first.isActive).toBeTruthy();
      expect(componentInstance.progressItems.first.isComplete).toBeTruthy();

      expect(componentInstance.progressItems.toArray()[1].isActive).toBeFalsy();
      expect(componentInstance.progressItems.toArray()[1].isComplete).toBeFalsy();
    }));

    it('should use inputted button type', fakeAsync(() => {
      fixture.componentInstance.previousButtonType = 'next';
      fixture.detectChanges();
      tick();

      expect(fixture.componentInstance.navButtons.first.buttonType).toBe('next');
    }));

    it('should default button type to next', fakeAsync(() => {
      fixture.componentInstance.previousButtonType = undefined;
      fixture.detectChanges();
      tick();

      expect(fixture.componentInstance.navButtons.first.buttonType).toBe('next');
    }));

    it('should use inputted button text', fakeAsync(() => {
      fixture.componentInstance.previousButtonText = 'good text';
      fixture.detectChanges();
      tick();

      expect(fixture.componentInstance.navButtons.first.buttonText).toBe('good text');
    }));

    it('should default button text for each button type', fakeAsync(() => {
      fixture.componentInstance.previousButtonText = undefined;
      fixture.componentInstance.nextButtonText = undefined;
      fixture.detectChanges();
      tick();

      expect(fixture.componentInstance.navButtons.first.buttonText).toBe('Previous');
      expect(fixture.componentInstance.navButtons.last.buttonText).toBe('Next');
    }));

    it('should use inputted disabled state', fakeAsync(() => {
      fixture.componentInstance.previousButtonDisabled = true;
      fixture.detectChanges();
      tick();
      let buttonElement = fixture.nativeElement.querySelectorAll('sky-progress-indicator-nav-button button')[0];

      expect(fixture.componentInstance.navButtons.first.disabled).toBeTruthy();
      expect(buttonElement.disabled).toBeTruthy();
    }));
  });
});
