import { Component } from '@angular/core';

@Component({
  selector: 'sky-demo-unit-test-modal',
  templateUrl: './unit-test-modal.component.html',
  styleUrls: ['./unit-test-modal.component.scss']
})
export class SkyDemoUnitTestModalComponent {
  public noMockSetup: string =
`let applicationRef: ApplicationRef;

        beforeEach(() => {
          TestBed.configureTestingModule({
            imports: [
              SkyAppTestModule
            ]
          });
        });

        beforeEach(
          inject(
          [
            SkyModalService,
            ApplicationRef
          ],
          (
            _modalService: SkyModalService,
            _applicationRef: ApplicationRef
          ) => {
            _modalService.dispose();
            applicationRef = _applicationRef;
          }
          )
        );`;

  public noMockTest: string =
`it('should launch and save data with the modal', fakeAsync(() => {
          const fixture = TestBed.createComponent(ModalLaunchingComponent);
          fixture.detectChanges();
          tick();
          let launchModalButtonEl
            = fixture.nativeElement.querySelector('.sky-btn.sky-test-modal-launch')
              as HTMLButtonElement;
          launchModalButtonEl.click();
          applicationRef.tick();
          let saveButton = document.querySelector('.sky-test-modal-save') as HTMLButtonElement;
          expect(saveButton).not.toBeNull();
          saveButton.click();
          applicationRef.tick();
          fixture.detectChanges();
        }));`;

  public mockLaunchSetup: string =
`class MockModalService {
          constructor() { };
          public open() {
            return {
              closed: {
                subscribe: (callback: Function) => {
                  this.closeCallback = callback;
                }
              }
            }
          }
          public closeCallback: Function;
        }

        let modalServiceInstance: MockModalService;

        beforeEach(() => {
          modalServiceInstance = new MockModalService();

          TestBed.configureTestingModule({
            imports: [
              SkyAppTestModule
            ],
            providers: [
              {
                provide: SkyModalService,
                useValue: modalServiceInstance
              }
            ]
          });
        });`;

  public mockLaunchTest: string =
`it('should mock opening and saving a modal', () => {

          const fixture = TestBed.createComponentModalLaunchingComponent);
          fixture.detectChanges();

          let launchModalButtonEl
            = fixture.nativeElement.querySelector('.sky-btn.sky-test-modal-launch')
              as HTMLButtonElement;
          launchModalButtonEl.click();

          fixture.detectChanges();

          modalServiceInstance.closeCallback({
            reason: 'save',
            data: 'complete'
          });

          fixture.detectChanges();

        });`;

  public mockModalComponentSetup: string =
`class MockModalInstance {
          constructor() { };

          public save(result: any) {
            this.saveResult = result;
          }

          public cancel(result: any) {
            this.cancelResult = result;
          }

          public close(result: any, reason: string) {
            this.closeResult = result;
            this.closeReason = reason;
          }

          public saveResult: any;
          public cancelResult: any;
          public closeResult: any;
          public closeReason: any;
        }

        let modalInstance: MockModalInstance;

        class MockModalHostService {
          constructor() {}

          public getModalZIndex() {}
          public onClose() {}

        }

        class MockModalConfiguration {
          constructor() {}
          public fullPage: boolean;
        }

        beforeEach(() => {
          modalInstance = new MockModalInstance();
          TestBed.configureTestingModule({
            imports: [
              SkyAppTestModule
            ],
            providers: [
              {
                provide: SkyModalInstance,
                useValue: modalInstance
              },
              {
                provide: SkyModalHostService,
                useValue: new MockModalHostService()
              },
              {
                provide: SkyModalConfiguation,
                useValue: new MockModalConfiguration()
              }
            ]
          });
        });`;

public mockModalComponentTest: string =
`it('should create a modal component without having to use the modal service', () => {
          const fixture = TestBed.createComponent(ModalDemoComponent);
          fixture.detectChanges();

          let saveButton = document.querySelector('.sky-test-modal-button') as HTMLButtonElement;
          saveButton.click();

          fixture.detectChanges();

          expect(modalInstance.saveResult).toBe('complete');
        });`;
}
