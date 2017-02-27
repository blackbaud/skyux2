import { TestBed } from '@angular/core/testing';

import { SkyResourcesService } from '../resources/resources.service';
import { SkyErrorFixturesModule } from './fixtures/error-fixtures.module';
import { ErrorTestComponent } from './fixtures/error.component.fixture';
import { expect } from '../testing';

describe('Error component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkyErrorFixturesModule
      ],
      providers: [ { provide: SkyResourcesService, useClass: SkyResourcesService } ]
    });
  });

  it('error type broken displays correct image, title, description, and action text', () => {
    let html = `<sky-error errorType="broken" (actionClicked)="customAction()"></sky-error>`;

    let fixture = TestBed
      .overrideComponent(
        ErrorTestComponent,
        {
          set: {
            template: html
          }
        }
      )
      .createComponent(ErrorTestComponent);

    let el = fixture.nativeElement;

    fixture.detectChanges();

    let title = 'Sorry, something went wrong.';
    let description = 'Try to refresh this page or come back later.';

    // check image
    expect(el.querySelector('.sky-error-broken-image')).toExist();
    expect(el.querySelector('.sky-error-notfound-image')).not.toExist();
    expect(el.querySelector('.sky-error-construction-image')).not.toExist();

    expect(el.querySelector('.sky-error-title')).toHaveText(title);
    expect(el.querySelector('.sky-error-description')).toHaveText(description);
    expect(el.querySelector('.sky-error-action button')).toHaveText('Refresh');
  });

  it('error type notfound displays correct image, title, description, and action text', () => {
    let html = `<sky-error errorType="notfound" (actionClicked)="customAction()"></sky-error>`;

    let fixture = TestBed
      .overrideComponent(
        ErrorTestComponent,
        {
          set: {
            template: html
          }
        }
      )
      .createComponent(ErrorTestComponent);

    let el = fixture.nativeElement;

    fixture.detectChanges();

    let title = 'Sorry, we can\'t reach that page.';

    // check image
    expect(el.querySelector('.sky-error-broken-image')).not.toExist();
    expect(el.querySelector('.sky-error-notfound-image')).toExist();
    expect(el.querySelector('.sky-error-construction-image')).not.toExist();

    expect(el.querySelector('.sky-error-title')).toHaveText(title);
    expect(el.querySelector('.sky-error-description')).not.toExist();
    expect(el.querySelector('.sky-error-action button')).toHaveText('Refresh');
  });

  it('error type construction displays correct image, title, description, and action text', () => {
    let html = `<sky-error errorType="construction" (actionClicked)="customAction()"></sky-error>`;

    let fixture = TestBed
      .overrideComponent(
        ErrorTestComponent,
        {
          set: {
            template: html
          }
        }
      )
      .createComponent(ErrorTestComponent);

    let el = fixture.nativeElement;

    fixture.detectChanges();

    let title = 'This page will return soon.';
    let description =
    `Thanks for your patience while improvements are made!  Please check back in a little while.`;

    let actualDescription: string = el.querySelector('.sky-error-description').innerText;

    // check image
    expect(el.querySelector('.sky-error-broken-image')).not.toExist();
    expect(el.querySelector('.sky-error-notfound-image')).not.toExist();
    expect(el.querySelector('.sky-error-construction-image')).toExist();

    expect(el.querySelector('.sky-error-title')).toHaveText(title);
    expect(actualDescription.replace('\n', '').trim()).toBe(description);
    expect(el.querySelector('.sky-error-action button')).toHaveText('Refresh');
  });

  it('error type custom displays correct image, title, description, and action text', () => {
    let html = `
    <sky-error
      title="test title"
      description="test description"
      actionText="test action text"
      (actionClicked)="customAction()">
    </sky-error>`;

    let fixture = TestBed
      .overrideComponent(
        ErrorTestComponent,
        {
          set: {
            template: html
          }
        }
      )
      .createComponent(ErrorTestComponent);

    let el = fixture.nativeElement;

    fixture.detectChanges();

    // check image
    expect(el.querySelector('.sky-error-broken-image')).toExist();
    expect(el.querySelector('.sky-error-notfound-image')).not.toExist();
    expect(el.querySelector('.sky-error-construction-image')).not.toExist();

    expect(el.querySelector('.sky-error-title')).toHaveText('test title');
    expect(el.querySelector('.sky-error-description')).toHaveText('test description');
    expect(el.querySelector('.sky-error-action button')).toHaveText('test action text');
  });

  it('custom action method is called with action button is clicked', () => {
    let html = `<sky-error errorType="broken" (actionClicked)="customAction()"></sky-error>`;

    let fixture = TestBed
      .overrideComponent(
        ErrorTestComponent,
        {
          set: {
            template: html
          }
        }
      )
      .createComponent(ErrorTestComponent);

    let el = fixture.nativeElement;
    let component = fixture.componentInstance;

    spyOn(component, 'customAction');

    let actionButton = el.querySelector('.sky-error-action button');
    actionButton.click();
    fixture.detectChanges();

    expect(component.customAction).toHaveBeenCalled();
  });
});
