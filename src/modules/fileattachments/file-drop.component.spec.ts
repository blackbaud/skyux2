import {
  TestBed,
  ComponentFixture
} from '@angular/core/testing';

import {
  By
} from '@angular/platform-browser';

import {
  SkyFileDropComponent
} from './file-drop.component';

import {
  SkyFileAttachmentsModule
} from './fileattachments.module';

import {
  SkyFileDropChange
} from './file-drop-change.class';

describe('File drop component', () => {

  let fixture: ComponentFixture<SkyFileDropComponent>;
  let el: any;
  let componentInstance: SkyFileDropComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkyFileAttachmentsModule
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkyFileDropComponent);
    el = fixture.nativeElement;
    componentInstance = fixture.componentInstance;
  });

  function getInputDebugEl() {
    return fixture.debugElement.query(By.css('input.sky-file-input-hidden'));
  }

  function getDropEl() {
    return el.querySelector('.sky-file-drop');
  }

  it('should create the file drop control', () => {

    fixture.detectChanges();

    let dropEl = getDropEl();

    expect(dropEl).toBeTruthy();

    expect(dropEl.classList.contains('sky-file-drop-accept')).toBe(false);
    expect(dropEl.classList.contains('sky-file-drop-reject')).toBe(false);

    let inputEl = getInputDebugEl();
    expect((<any>inputEl.references).fileInput).toBeTruthy();
  });

  function testClick(expectedResult: boolean) {
    let inputClicked = false;

    fixture.detectChanges();

    let inputEl = getInputDebugEl();

    spyOn((<any>inputEl.references).fileInput, 'click').and.callFake(function () {
      inputClicked = true;
    });

    let dropEl = getDropEl();

    dropEl.click();

    fixture.detectChanges();

    expect(inputClicked).toBe(expectedResult);
  }

  it('should click the file input on file drop click', () => {
    testClick(true);
  });

  it('should prevent click when noclick is specified', () => {
    componentInstance.noClick = true;
    fixture.detectChanges();
    testClick(false);
  });

  function triggerChangeEvent(expectedChangeFiles: any[]) {
    let inputEl = getInputDebugEl();

    let fileChangeEvent = {
      target: {
        files: {
          length: expectedChangeFiles.length,
          item: function (index: number) {
            return expectedChangeFiles[index];
          }
        }
      }
    };

    inputEl.triggerEventHandler('change', fileChangeEvent);
  }

  function setupFileReaderSpy() {
    let loadCallbacks: Function[] = [];
    let errorCallbacks: Function[] = [];
    let abortCallbacks: Function[] = []

    spyOn(window, 'FileReader').and.returnValue({
      readAsDataURL: function(file: any) {

      },
      addEventListener: function(type: string, callback: Function) {
        if (type === 'load') {
          loadCallbacks.push(callback);
        } else if (type === 'error') {
          errorCallbacks.push(callback);
        } else if (type === 'abort') {
          abortCallbacks.push(callback);
        }
      }
    });

    return {
      loadCallbacks: loadCallbacks,
      errorCallbacks: errorCallbacks,
      abortCallbacks: abortCallbacks
    };
  }

  it('should load and emit files on file change event', () => {
    let filesChangedActual: SkyFileDropChange;

    componentInstance.filesChanged.subscribe((filesChanged: SkyFileDropChange) => filesChangedActual = filesChanged );

    let fileReaderSpy = setupFileReaderSpy();

    triggerChangeEvent([
      {
        name: 'foo.txt',
        size: 1000
      },
      {
        name: 'woo.txt',
        size: 2000
      }
    ]);

    fixture.detectChanges();

    fileReaderSpy.loadCallbacks[0]({
      target: {
        result: 'url'
      }
    });

    fileReaderSpy.loadCallbacks[1]({
      target: {
        result: 'newurl'
      }
    });

    fixture.detectChanges();

    expect(filesChangedActual.files.length).toBe(2);
    expect(filesChangedActual.files[0].url).toBe('url');
    expect(filesChangedActual.files[0].name).toBe('foo.txt');
    expect(filesChangedActual.files[0].size).toBe(1000);

    expect(filesChangedActual.files[1].url).toBe('newurl');
    expect(filesChangedActual.files[1].name).toBe('woo.txt');
    expect(filesChangedActual.files[1].size).toBe(2000);
  });

  it('should load and emit files on file change event when file reader has an error and aborts', () => {
    let filesChangedActual: SkyFileDropChange;

    componentInstance.filesChanged.subscribe((filesChanged: SkyFileDropChange) => filesChangedActual = filesChanged );

    let fileReaderSpy = setupFileReaderSpy();

    triggerChangeEvent([
      {
        name: 'foo.txt',
        size: 1000
      },
      {
        name: 'woo.txt',
        size: 2000
      },
      {
        name: 'goo.txt',
        size: 3000
      }
    ]);

    fixture.detectChanges();

    fileReaderSpy.abortCallbacks[0]();

    fileReaderSpy.loadCallbacks[1]({
      target: {
        result: 'anotherurl'
      }
    })

    fileReaderSpy.errorCallbacks[2]();

    fixture.detectChanges();

    expect(filesChangedActual.files.length).toBe(1);
    expect(filesChangedActual.files[0].url).toBe('anotherurl');
    expect(filesChangedActual.files[0].name).toBe('woo.txt');
    expect(filesChangedActual.files[0].size).toBe(2000);

    expect(filesChangedActual.rejectedFiles.length).toBe(2);

    expect(filesChangedActual.rejectedFiles[0].name).toBe('foo.txt');
    expect(filesChangedActual.rejectedFiles[0].size).toBe(1000);

    expect(filesChangedActual.rejectedFiles[1].name).toBe('goo.txt');
    expect(filesChangedActual.rejectedFiles[1].size).toBe(3000);
  });

  it('should allow the user to specify to not allow multiple files', () => {
    componentInstance.multiple = false;
    fixture.detectChanges();
    let inputEl = getInputDebugEl();

    expect(inputEl.nativeElement.hasAttribute('multiple')).toBe(false);

    componentInstance.multiple = true;
    fixture.detectChanges();
    expect(inputEl.nativeElement.hasAttribute('multiple')).toBe(true);
  });

  it('should allow the user to specify a min file size', () => {

  });

  it('should allow the user to specify a max file size', () => {

  });

  it('should allow the user to specify a validation function', () => {

  });

  it('should allow the user to specify accepted types', () => {

  });

  it('should load files and set classes on drag and drop', () => {

  });

  it('should prevent loading directories on drag and drop', () => {

  });

  it('should prevent loading multiple files on drag and drop when multiple is false', () => {

  });

  it('should show link section when allowLinks is true', () => {

  });

  it('should emit link event when link is added on click', () => {

  });

  it('should emit link event when link is added on enter press', () => {

  });

  it('should allow custom content inside of the file drop component', () => {

  });

});
