import {
    it,
    describe,
    expect,
    beforeEach,
    inject,
    async,
    fakeAsync,
    flushMicrotasks,
    tick
} from '@angular/core/testing';
import {FORM_DIRECTIVES, NgModel, NgControl} from '@angular/common';
import {TestComponentBuilder, ComponentFixture} from '@angular/compiler/testing';
import {Component, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {SkyCheckboxComponent, SkyCheckboxChange} from './checkbox.component';

describe('Checkbox component', () => {
  let builder: TestComponentBuilder;
  let fixture: ComponentFixture<any>;

  beforeEach(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    builder = tcb;
  }));

  describe('basic behaviors', () => {
    let checkboxDebugElement: DebugElement;
    let checkboxNativeElement: HTMLElement;
    let checkboxInstance: SkyCheckboxComponent;
    let testComponent: SingleCheckbox;
    let inputElement: HTMLInputElement;
    let labelElement: HTMLLabelElement;

    beforeEach(async(() => {
      builder.createAsync(SingleCheckbox).then(f => {
        fixture = f;
        fixture.detectChanges();

        checkboxDebugElement = fixture.debugElement.query(By.directive(SkyCheckboxComponent));
        checkboxNativeElement = checkboxDebugElement.nativeElement;
        checkboxInstance = checkboxDebugElement.componentInstance;
        testComponent = fixture.debugElement.componentInstance;
        inputElement = <HTMLInputElement>checkboxNativeElement.querySelector('input');
        labelElement = <HTMLLabelElement>checkboxNativeElement.querySelector('label.sky-checkbox-wrapper');
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

    it('should toggle checked state on click', () => {
      expect(checkboxInstance.checked).toBe(false);

      labelElement.click();
      fixture.detectChanges();

      expect(checkboxInstance.checked).toBe(true);

      labelElement.click();
      fixture.detectChanges();

      expect(checkboxInstance.checked).toBe(false);
    });

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

      checkboxNativeElement.click();
      expect(checkboxInstance.checked).toBe(false);
    });

    it('should preserve the user-provided id', () => {
      expect(checkboxNativeElement.id).toBe('simple-check');
    });

    it('should project the checkbox content into the label element', () => {
      let label = <HTMLLabelElement>checkboxNativeElement.querySelector('.sky-checkbox-wrapper sky-checkbox-label');
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
    let testComponent: CheckboxWithChangeEvent;
    let inputElement: HTMLInputElement;
    let labelElement: HTMLLabelElement;

    beforeEach(async(() => {
      builder.createAsync(CheckboxWithChangeEvent).then(f => {
        fixture = f;
        fixture.detectChanges();

        checkboxDebugElement = fixture.debugElement.query(By.directive(SkyCheckboxComponent));
        checkboxNativeElement = checkboxDebugElement.nativeElement;
        checkboxInstance = checkboxDebugElement.componentInstance;
        testComponent = fixture.debugElement.componentInstance;
        inputElement = <HTMLInputElement>checkboxNativeElement.querySelector('input');
        labelElement = <HTMLLabelElement>checkboxNativeElement.querySelector('label.sky-checkbox-wrapper');
      });
    }));

    it('should call the change event on first change after initialization', fakeAsync(() => {
      fixture.detectChanges();
      expect(testComponent.lastEvent).toBeUndefined();

      checkboxInstance.checked = true;
      fixture.detectChanges();

      tick();

      expect(testComponent.lastEvent.checked).toBe(true);
    }));

    it('should not emit a DOM event to the change output', async(() => {
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

  describe('with provided aria-label ', () => {
    let checkboxDebugElement: DebugElement;
    let checkboxNativeElement: HTMLElement;
    let inputElement: HTMLInputElement;

    it('should use the provided aria-label', async(() => {
      builder.createAsync(CheckboxWithAriaLabel).then(f => {
        fixture = f;
        checkboxDebugElement = fixture.debugElement.query(By.directive(SkyCheckboxComponent));
        checkboxNativeElement = checkboxDebugElement.nativeElement;
        inputElement = <HTMLInputElement>checkboxNativeElement.querySelector('input');

        fixture.detectChanges();
        expect(inputElement.getAttribute('aria-label')).toBe('Super effective');
      });
    }));
  });

  describe('with provided aria-labelledby ', () => {
    let checkboxDebugElement: DebugElement;
    let checkboxNativeElement: HTMLElement;
    let inputElement: HTMLInputElement;

    it('should use the provided aria-labelledby', async(() => {
      builder.createAsync(CheckboxWithAriaLabelledby).then(f => {
        fixture = f;
        checkboxDebugElement = fixture.debugElement.query(By.directive(SkyCheckboxComponent));
        checkboxNativeElement = checkboxDebugElement.nativeElement;
        inputElement = <HTMLInputElement>checkboxNativeElement.querySelector('input');

        fixture.detectChanges();
        expect(inputElement.getAttribute('aria-labelledby')).toBe('some-id');
      });
    }));

    it('should not assign aria-labelledby if none is provided', async(() => {
      builder.createAsync(SingleCheckbox).then(f => {
        fixture = f;
        checkboxDebugElement = fixture.debugElement.query(By.directive(SkyCheckboxComponent));
        checkboxNativeElement = checkboxDebugElement.nativeElement;
        inputElement = <HTMLInputElement>checkboxNativeElement.querySelector('input');

        fixture.detectChanges();
        expect(inputElement.getAttribute('aria-labelledby')).toBe(null);
      });
    }));
  });

  describe('with provided tabIndex', () => {
    let checkboxDebugElement: DebugElement;
    let checkboxNativeElement: HTMLElement;
    let testComponent: CheckboxWithTabIndex;
    let inputElement: HTMLInputElement;
    let labelElement: HTMLLabelElement;

    beforeEach(async(() => {
      builder.createAsync(CheckboxWithTabIndex).then(f => {
        fixture = f;
        fixture.detectChanges();

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
      builder.createAsync(MultipleCheckboxes).then(f => {
        fixture = f;
        fixture.detectChanges();
      });
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

  describe('with ngModel and ngControl', () => {
    beforeEach(async(() => {
      builder.createAsync(CheckboxWithFormDirectives).then(f => {
        f.detectChanges();
        fixture = f;
      });
    }));

    it('should be in pristine, untouched, and valid states initially', fakeAsync(() => {
      flushMicrotasks();

      let checkboxElement = fixture.debugElement.query(By.directive(SkyCheckboxComponent));
      let ngControl = <NgControl> checkboxElement.injector.get(NgControl);

      expect(ngControl.valid).toBe(true);
      expect(ngControl.pristine).toBe(true);
      expect(ngControl.touched).toBe(false);

      // TODO(jelbourn): test that `touched` and `pristine` state are modified appropriately.
      // This is currently blocked on issues with async() and fakeAsync().
    }));
  });

  describe('with name attribute', () => {
    beforeEach(async(() => {
      builder.createAsync(CheckboxWithNameAttribute).then(f => {
        f.detectChanges();
        fixture = f;
      });
    }));

    it('should forward name value to input element', fakeAsync(() => {
      let checkboxElement = fixture.debugElement.query(By.directive(SkyCheckboxComponent));
      let inputElement = <HTMLInputElement> checkboxElement.nativeElement.querySelector('input');

      expect(inputElement.getAttribute('name')).toBe('test-name');
    }));
  });
});

/** Simple component for testing a single checkbox. */
@Component({
  directives: [SkyCheckboxComponent],
  template: `
  <div (click)="parentElementClicked = true" (keyup)="parentElementKeyedUp = true">    
    <sky-checkbox 
        id="simple-check"
        [checked]="isChecked" 
        [disabled]="isDisabled"
        (change)="changeCount = changeCount + 1">
      Simple checkbox
    </sky-checkbox>
  </div>`
})
class SingleCheckbox {
  isChecked: boolean = false;
  isDisabled: boolean = false;
  parentElementClicked: boolean = false;
  parentElementKeyedUp: boolean = false;
  lastKeydownEvent: Event = null;
}

/** Simple component for testing an MdCheckbox with ngModel and ngControl. */
@Component({
  directives: [SkyCheckboxComponent, FORM_DIRECTIVES, NgModel],
  template: `
    <form>
      <md-checkbox ngControl="cb" [(ngModel)]="isGood">Be good</md-checkbox>
    </form>
  `,
})
class CheckboxWithFormDirectives {
  isGood: boolean = false;
}

/** Simple test component with multiple checkboxes. */
@Component(({
  directives: [SkyCheckboxComponent],
  template: `
    <md-checkbox>Option 1</md-checkbox>
    <md-checkbox>Option 2</md-checkbox>
  `
}))
class MultipleCheckboxes { }


/** Simple test component with tabIndex */
@Component({
  directives: [SkyCheckboxComponent],
  template: `
    <md-checkbox [tabindex]="customTabIndex" [disabled]="isDisabled">
    </md-checkbox>`,
})
class CheckboxWithTabIndex {
  customTabIndex: number = 7;
  isDisabled: boolean = false;
}

/** Simple test component with an aria-label set. */
@Component({
  directives: [SkyCheckboxComponent],
  template: `<md-checkbox aria-label="Super effective"></md-checkbox>`
})
class CheckboxWithAriaLabel { }

/** Simple test component with an aria-label set. */
@Component({
  directives: [SkyCheckboxComponent],
  template: `<md-checkbox aria-labelledby="some-id"></md-checkbox>`
})
class CheckboxWithAriaLabelledby {}

/** Simple test component with name attribute */
@Component({
  directives: [SkyCheckboxComponent],
  template: `<md-checkbox name="test-name"></md-checkbox>`
})
class CheckboxWithNameAttribute {}

/** Simple test component with change event */
@Component({
  directives: [SkyCheckboxComponent],
  template: `<md-checkbox (change)="lastEvent = $event"></md-checkbox>`
})
class CheckboxWithChangeEvent {
  lastEvent: SkyCheckboxChange;
}
