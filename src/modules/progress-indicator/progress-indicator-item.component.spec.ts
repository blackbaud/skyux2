import {
  fakeAsync,
  TestBed,
  ComponentFixture,
  tick
} from '@angular/core/testing';
import {
  SkyProgressIndicatorModule,
  SkyProgressIndicatorComponent,
  SkyProgressIndicatorMessageType
} from '.';
import {
  ProgressIndicatorTestComponent
} from './fixtures/progress-indicator.component.fixture';

describe('Progress indicator component', function () {

  let fixture: ComponentFixture<ProgressIndicatorTestComponent>;
  let componentInstance: SkyProgressIndicatorComponent;
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        SkyProgressIndicatorModule
      ],
      declarations: [
        ProgressIndicatorTestComponent
      ]
    });

    fixture = TestBed.createComponent(ProgressIndicatorTestComponent);

    fixture.detectChanges();
    tick();
    componentInstance = fixture.componentInstance.progressIndicator;
  }));

  it('should advance progress and complete current item when a complete message is received.', () => {
    expect((componentInstance as any).activeIndex).toBe(0);
    expect((componentInstance as any).progressItems.first.isActive).toBeTruthy();
    expect((componentInstance as any).progressItems.first.isComplete).toBeFalsy();

    componentInstance.messageStream.next(SkyProgressIndicatorMessageType.ItemComplete);
    fixture.detectChanges();

    expect((componentInstance as any).activeIndex).toBe(1);
    expect((componentInstance as any).progressItems.first.isActive).toBeFalsy();
    expect((componentInstance as any).progressItems.first.isComplete).toBeTruthy();

    expect((componentInstance as any).progressItems.toArray()[1].isActive).toBeTruthy();
    expect((componentInstance as any).progressItems.toArray()[1].isComplete).toBeFalsy();
  });

  it('should not advance once past the final step', () => {
    componentInstance.messageStream.next(SkyProgressIndicatorMessageType.ItemComplete);
    fixture.detectChanges();
    componentInstance.messageStream.next(SkyProgressIndicatorMessageType.ItemComplete);
    fixture.detectChanges();
    componentInstance.messageStream.next(SkyProgressIndicatorMessageType.ItemComplete);
    fixture.detectChanges();

    expect((componentInstance as any).activeIndex).toBe(3);
    expect((componentInstance as any).progressItems.last.isActive).toBeFalsy();
    expect((componentInstance as any).progressItems.last.isComplete).toBeTruthy();

    componentInstance.messageStream.next(SkyProgressIndicatorMessageType.ItemComplete);
    fixture.detectChanges();

    expect((componentInstance as any).activeIndex).toBe(3);
  });

  it('should not regress when on the first step', () => {
    expect((componentInstance as any).activeIndex).toBe(0);
    expect((componentInstance as any).progressItems.first.isActive).toBeTruthy();
    expect((componentInstance as any).progressItems.first.isComplete).toBeFalsy();

    componentInstance.messageStream.next(SkyProgressIndicatorMessageType.ItemIncomplete);
    fixture.detectChanges();

    expect((componentInstance as any).activeIndex).toBe(0);
    expect((componentInstance as any).progressItems.first.isActive).toBeTruthy();
    expect((componentInstance as any).progressItems.first.isComplete).toBeFalsy();
  });

  it('should leave completed tasks marked as such when regressing progress', () => {
    componentInstance.messageStream.next(SkyProgressIndicatorMessageType.ItemComplete);
    fixture.detectChanges();
    componentInstance.messageStream.next(SkyProgressIndicatorMessageType.ItemComplete);
    fixture.detectChanges();

    expect((componentInstance as any).progressItems.first.isComplete).toBeTruthy();
    expect((componentInstance as any).progressItems.first.isActive).toBeFalsy();

    expect((componentInstance as any).progressItems.toArray()[1].isComplete).toBeTruthy();
    expect((componentInstance as any).progressItems.toArray()[1].isActive).toBeFalsy();

    expect((componentInstance as any).progressItems.last.isComplete).toBeFalsy();
    expect((componentInstance as any).progressItems.last.isActive).toBeTruthy();

    componentInstance.messageStream.next(SkyProgressIndicatorMessageType.ItemIncomplete);
    fixture.detectChanges();
    componentInstance.messageStream.next(SkyProgressIndicatorMessageType.ItemIncomplete);
    fixture.detectChanges();

    expect((componentInstance as any).progressItems.first.isComplete).toBeTruthy();
    expect((componentInstance as any).progressItems.first.isActive).toBeTruthy();

    expect((componentInstance as any).progressItems.toArray()[1].isComplete).toBeTruthy();
    expect((componentInstance as any).progressItems.toArray()[1].isActive).toBeFalsy();

    expect((componentInstance as any).progressItems.last.isComplete).toBeFalsy();
    expect((componentInstance as any).progressItems.last.isActive).toBeFalsy();
  });

  it('should reset progress when a reset progress message is passed', () => {
    componentInstance.messageStream.next(SkyProgressIndicatorMessageType.ItemComplete);
    fixture.detectChanges();
    componentInstance.messageStream.next(SkyProgressIndicatorMessageType.ItemComplete);
    fixture.detectChanges();

    expect((componentInstance as any).progressItems.first.isComplete).toBeTruthy();
    expect((componentInstance as any).progressItems.first.isActive).toBeFalsy();

    expect((componentInstance as any).progressItems.toArray()[1].isComplete).toBeTruthy();
    expect((componentInstance as any).progressItems.toArray()[1].isActive).toBeFalsy();

    expect((componentInstance as any).progressItems.last.isComplete).toBeFalsy();
    expect((componentInstance as any).progressItems.last.isActive).toBeTruthy();

    componentInstance.messageStream.next(SkyProgressIndicatorMessageType.ProgressReset);
    fixture.detectChanges();

    expect((componentInstance as any).progressItems.first.isComplete).toBeFalsy();
    expect((componentInstance as any).progressItems.first.isActive).toBeTruthy();

    expect((componentInstance as any).progressItems.toArray()[1].isComplete).toBeFalsy();
    expect((componentInstance as any).progressItems.toArray()[1].isActive).toBeFalsy();

    expect((componentInstance as any).progressItems.last.isComplete).toBeFalsy();
    expect((componentInstance as any).progressItems.last.isActive).toBeFalsy();
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
