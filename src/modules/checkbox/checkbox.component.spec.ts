import {
  ComponentFixture,
  async,
  TestBed
} from '@angular/core/testing';

import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, NgModel } from '@angular/forms';
import {Component, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

import {SkyCheckboxComponent, SkyCheckboxChange} from './checkbox.component';
import { SkyCheckboxModule } from './checkbox.module';

describe('Checkbox component', () => {
  let fixture: ComponentFixture<any>;

  function createEvent(eventName: string) {
    let evt = document.createEvent('CustomEvent');
    evt.initEvent(eventName, false, false);
    return evt;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CheckboxWithAriaLabelComponent,
        CheckboxWithAriaLabelledbyComponent,
        CheckboxWithChangeEventComponent,
        CheckboxWithFormDirectivesComponent,
        CheckboxWithNameAttributeComponent,
        CheckboxWithTabIndexComponent,
        MultipleCheckboxesComponent,
        SingleCheckboxComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        SkyCheckboxModule
      ]
    });
  });

  describe('basic behaviors', () => {
    let checkboxDebugElement: DebugElement;
    let checkboxNativeElement: HTMLElement;
    let checkboxInstance: SkyCheckboxComponent;
    let testComponent: SingleCheckboxComponent;
    let inputElement: HTMLInputElement;
    let labelElement: HTMLLabelElement;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(SingleCheckboxComponent);

      fixture.whenStable().then(() => {
        checkboxDebugElement = fixture.debugElement.query(By.directive(SkyCheckboxComponent));
        checkboxNativeElement = checkboxDebugElement.nativeElement;
        checkboxInstance = checkboxDebugElement.componentInstance;
        testComponent = fixture.debugElement.componentInstance;
        inputElement = <HTMLInputElement>checkboxNativeElement.querySelector('input');
        labelElement =
          <HTMLLabelElement>checkboxNativeElement.querySelector('label.sky-checkbox-wrapper');
      });
    }));

    it('should add and remove the checked state', () => {
      expect(checkboxInstance.checked).toBe(false);
      expect(inputElement.checked).toBe(false);

      testComponent.isChecked = true;
      fixture.detectChanges();

      expect(checkboxInstance.checked).toBe(true);
      expect(inputElement.checked).toBe(true);

      testComponent.isChecked = false;
      fixture.detectChanges();

      expect(checkboxInstance.checked).toBe(false);
      expect(inputElement.checked).toBe(false);
    });

    it('should toggle checked state on click', async(() => {
      fixture.detectChanges();
      expect(checkboxInstance.checked).toBe(false);
      expect(testComponent.isChecked).toBe(false);

      labelElement.click();

      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(checkboxInstance.checked).toBe(true);
        expect(testComponent.isChecked).toBe(true);

        labelElement.click();

        fixture.whenStable().then(() => {
          fixture.detectChanges();

          expect(checkboxInstance.checked).toBe(false);
          expect(testComponent.isChecked).toBe(false);
        });
      });
    }));

    it('should add and remove disabled state', () => {
      expect(checkboxInstance.disabled).toBe(false);
      expect(inputElement.tabIndex).toBe(0);
      expect(inputElement.disabled).toBe(false);

      testComponent.isDisabled = true;
      fixture.detectChanges();

      expect(checkboxInstance.disabled).toBe(true);
      expect(inputElement.disabled).toBe(true);

      testComponent.isDisabled = false;
      fixture.detectChanges();

      expect(checkboxInstance.disabled).toBe(false);
      expect(inputElement.tabIndex).toBe(0);
      expect(inputElement.disabled).toBe(false);
    });

    it('should not toggle `checked` state upon interation while disabled', () => {
      testComponent.isDisabled = true;
      fixture.detectChanges();

      inputElement.dispatchEvent(createEvent('change'));
      fixture.detectChanges();
      expect(checkboxInstance.checked).toBe(false);
      labelElement.click();
      expect(checkboxInstance.checked).toBe(false);
    });

    it('should preserve the user-provided id', () => {
      expect(checkboxNativeElement.id).toBe('simple-check');
    });

    it('should project the checkbox content into the label element', () => {
      let label =
        <HTMLLabelElement>checkboxNativeElement
          .querySelector('.sky-checkbox-wrapper sky-checkbox-label');
      expect(label.textContent.trim()).toBe('Simple checkbox');
    });

    it('should make the host element a tab stop', () => {
      expect(inputElement.tabIndex).toBe(0);
    });

  });

  describe('with change event and no initial value', () => {
    let checkboxDebugElement: DebugElement;
    let checkboxNativeElement: HTMLElement;
    let checkboxInstance: SkyCheckboxComponent;
    let testComponent: CheckboxWithChangeEventComponent;
    let inputElement: HTMLInputElement;
    let labelElement: HTMLLabelElement;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(CheckboxWithChangeEventComponent);

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        checkboxDebugElement = fixture.debugElement.query(By.directive(SkyCheckboxComponent));
        checkboxNativeElement = checkboxDebugElement.nativeElement;
        checkboxInstance = checkboxDebugElement.componentInstance;
        testComponent = fixture.debugElement.componentInstance;
        inputElement = <HTMLInputElement>checkboxNativeElement.querySelector('input');
        labelElement =
          <HTMLLabelElement>checkboxNativeElement.querySelector('label.sky-checkbox-wrapper');
      });
    }));

    it('should call not call the change event when the checkbox is not interacted with',
      async(() => {
      fixture.detectChanges();
      expect(testComponent.lastEvent).toBeUndefined();

      checkboxInstance.checked = true;
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(testComponent.lastEvent).toBeUndefined();
      });
    }));

    it('should call the change event and not emit a DOM event to the change output', async(() => {
      fixture.detectChanges();
      expect(testComponent.lastEvent).toBeUndefined();

      // Trigger the click on the inputElement, because the input will probably
      // emit a DOM event to the change output.
      inputElement.click();
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        // We're checking the arguments type / emitted value to be a boolean, because sometimes the
        // emitted value can be a DOM Event, which is not valid.
        // See angular/angular#4059
        expect(testComponent.lastEvent.checked).toBe(true);
      });

    }));
  });

  describe('with provided label attribute ', () => {
    let checkboxDebugElement: DebugElement;
    let checkboxNativeElement: HTMLElement;
    let inputElement: HTMLInputElement;

    it('should use the provided label as the input aria-label', async(() => {
      fixture = TestBed.createComponent(CheckboxWithAriaLabelComponent);

      checkboxDebugElement = fixture.debugElement.query(By.directive(SkyCheckboxComponent));
      checkboxNativeElement = checkboxDebugElement.nativeElement;
      inputElement = <HTMLInputElement>checkboxNativeElement.querySelector('input');

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(inputElement.getAttribute('aria-label')).toBe('Super effective');
      });
    }));
  });

  describe('with provided labelledBy attribute ', () => {
    let checkboxDebugElement: DebugElement;
    let checkboxNativeElement: HTMLElement;
    let inputElement: HTMLInputElement;

    it('should use the provided labeledBy as the input aria-labelledby', async(() => {
      fixture = TestBed.createComponent(CheckboxWithAriaLabelledbyComponent);

      checkboxDebugElement = fixture.debugElement.query(By.directive(SkyCheckboxComponent));
      checkboxNativeElement = checkboxDebugElement.nativeElement;
      inputElement = <HTMLInputElement>checkboxNativeElement.querySelector('input');

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(inputElement.getAttribute('aria-labelledby')).toBe('some-id');
      });
    }));

    it('should not assign aria-labelledby if no labeledBy is provided', async(() => {
      fixture = TestBed.createComponent(SingleCheckboxComponent);

      checkboxDebugElement = fixture.debugElement.query(By.directive(SkyCheckboxComponent));
      checkboxNativeElement = checkboxDebugElement.nativeElement;
      inputElement = <HTMLInputElement>checkboxNativeElement.querySelector('input');

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(inputElement.getAttribute('aria-labelledby')).toBeNull();
      });
    }));
  });

  describe('with provided tabIndex', () => {
    let checkboxDebugElement: DebugElement;
    let checkboxNativeElement: HTMLElement;
    let testComponent: CheckboxWithTabIndexComponent;
    let inputElement: HTMLInputElement;
    let labelElement: HTMLLabelElement;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(CheckboxWithTabIndexComponent);

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        testComponent = fixture.debugElement.componentInstance;
        checkboxDebugElement = fixture.debugElement.query(By.directive(SkyCheckboxComponent));
        checkboxNativeElement = checkboxDebugElement.nativeElement;
        inputElement = <HTMLInputElement>checkboxNativeElement.querySelector('input');
        labelElement = <HTMLLabelElement>checkboxNativeElement.querySelector('label');
      });
    }));

    it('should preserve any given tabIndex', async(() => {
      expect(inputElement.tabIndex).toBe(7);
    }));

    it('should preserve given tabIndex when the checkbox is disabled then enabled', () => {
      testComponent.isDisabled = true;
      fixture.detectChanges();

      testComponent.customTabIndex = 13;
      fixture.detectChanges();

      testComponent.isDisabled = false;
      fixture.detectChanges();

      expect(inputElement.tabIndex).toBe(13);
    });
  });

  describe('with multiple checkboxes', () => {
    beforeEach(async(() => {
      fixture = TestBed.createComponent(MultipleCheckboxesComponent);

      fixture.detectChanges();
    }));

    it('should assign a unique id to each checkbox', () => {
      let [firstId, secondId] =
          fixture.debugElement.queryAll(By.directive(SkyCheckboxComponent))
          .map(debugElement => debugElement.nativeElement.querySelector('input').id);

      expect(firstId).toBeTruthy();
      expect(secondId).toBeTruthy();
      expect(firstId).not.toEqual(secondId);
    });
  });

  describe('with ngModel', () => {
    beforeEach(async(() => {
      fixture = TestBed.createComponent(CheckboxWithFormDirectivesComponent);

      fixture.detectChanges();
    }));

    it('should be in pristine, untouched, and valid states initially', async(() => {

      let checkboxElement = fixture.debugElement.query(By.directive(SkyCheckboxComponent));
      let ngModel = <NgModel> checkboxElement.injector.get(NgModel);
      let labelElement =
          <HTMLLabelElement>checkboxElement
            .nativeElement.querySelector('label.sky-checkbox-wrapper');
      let inputElement = checkboxElement.nativeElement.querySelector('input');
      let testComponent = fixture.debugElement.componentInstance;

      expect(ngModel.valid).toBe(true);
      expect(ngModel.pristine).toBe(true);
      expect(ngModel.touched).toBe(false);

      labelElement.click();

      fixture.whenStable().then(() => {
        fixture.detectChanges();

        expect(ngModel.valid).toBe(true);
        expect(ngModel.pristine).toBe(false);
        expect(ngModel.touched).toBe(false);
        expect(testComponent.isGood).toBe(true);

        inputElement.dispatchEvent(createEvent('blur'));
        expect(ngModel.touched).toBe(true);
      });

    }));
  });

  describe('with name attribute', () => {
    beforeEach(async(() => {
      fixture = TestBed.createComponent(CheckboxWithNameAttributeComponent);

      fixture.detectChanges();
    }));

    it('should forward name value to input element', () => {
      let checkboxElement = fixture.debugElement.query(By.directive(SkyCheckboxComponent));
      let inputElement = <HTMLInputElement> checkboxElement.nativeElement.querySelector('input');

      expect(inputElement.getAttribute('name')).toBe('test-name');
    });
  });
});

/** Simple component for testing a single checkbox. */
@Component({
  directives: [SkyCheckboxComponent],
  template: `
  <div>
    <sky-checkbox
        id="simple-check"
        [checked]="isChecked"
        [disabled]="isDisabled"
        (change)="checkboxChange($event)">
      <sky-checkbox-label>
        Simple checkbox
      </sky-checkbox-label>
    </sky-checkbox>
  </div>`
})
class SingleCheckboxComponent {
  public isChecked: boolean = false;
  public isDisabled: boolean = false;

  public checkboxChange($event: any) {
    this.isChecked = $event.checked;
  }
}

/** Simple component for testing an MdCheckbox with ngModel. */
@Component({
  directives: [SkyCheckboxComponent],
  template: `
    <form>
      <sky-checkbox name="cb" [(ngModel)]="isGood">
        <sky-checkbox-label>
          Be good
        </sky-checkbox-label>
      </sky-checkbox>
    </form>
  `
})
class CheckboxWithFormDirectivesComponent {
  public isGood: boolean = false;
}

/** Simple test component with multiple checkboxes. */
@Component(({
  directives: [SkyCheckboxComponent],
  template: `
    <sky-checkbox>
      <sky-checkbox-label>
        Option 1
      </sky-checkbox-label>
    </sky-checkbox>
    <sky-checkbox>Option 2</sky-checkbox>
  `
}))
class MultipleCheckboxesComponent { }

/** Simple test component with tabIndex */
@Component({
  directives: [SkyCheckboxComponent],
  template: `
    <sky-checkbox [tabindex]="customTabIndex" [disabled]="isDisabled">
    </sky-checkbox>`
})
class CheckboxWithTabIndexComponent {
  public customTabIndex: number = 7;
  public isDisabled: boolean = false;
}

/** Simple test component with an aria-label set. */
@Component({
  directives: [SkyCheckboxComponent],
  template: `<sky-checkbox label="Super effective"></sky-checkbox>`
})
class CheckboxWithAriaLabelComponent { }

/** Simple test component with an aria-label set. */
@Component({
  directives: [SkyCheckboxComponent],
  template: `<sky-checkbox labelledBy="some-id"></sky-checkbox>`
})
class CheckboxWithAriaLabelledbyComponent {}

/** Simple test component with name attribute */
@Component({
  directives: [SkyCheckboxComponent],
  template: `<sky-checkbox name="test-name"></sky-checkbox>`
})
class CheckboxWithNameAttributeComponent {}

/** Simple test component with change event */
@Component({
  directives: [SkyCheckboxComponent],
  template: `<sky-checkbox (change)="lastEvent = $event"></sky-checkbox>`
})
class CheckboxWithChangeEventComponent {
  public lastEvent: SkyCheckboxChange;
}
