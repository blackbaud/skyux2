// #region imports
import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  expect
} from '@blackbaud/skyux-builder/runtime/testing/browser';

import {
  SkyToastFixturesModule,
  SkyToastTestComponent
} from './fixtures';
// #endregion

fdescribe('Toast component', () => {
  let fixture: ComponentFixture<SkyToastTestComponent>;
  let component: SkyToastTestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkyToastFixturesModule
      ]
    });

    fixture = TestBed.createComponent(SkyToastTestComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should set defaults', () => {
    expect(component.toastComponent.toastType).toEqual('info');
  });
});

// import {
//   ComponentFactoryResolver,
//   Injector
// } from '@angular/core';
// import {
//   TestBed
// } from '@angular/core/testing';

// import {
//   SkyToastInstance
// } from '../types';
// import {
//   SkyToastComponent
// } from '.';

// describe('Toast component', () => {
//   class TestComponent { constructor(public instance: SkyToastInstance) {} }
//   let instance: SkyToastInstance;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [
//         Injector,
//         {
//           provide: ComponentFactoryResolver,
//           useValue: {
//             resolveComponentFactory() {
//               return {
//                 create() {
//                   return {
//                     destroy() {},
//                     hostView: {
//                       rootNodes: [
//                         {}
//                       ]
//                     },
//                     instance: {
//                       messageStream: {
//                         take() {
//                           return {
//                             subscribe() { }
//                           };
//                         },
//                         next() {}
//                       },
//                       attach() {
//                         return {
//                           close() { },
//                           closed: {
//                             take() {
//                               return {
//                                 subscribe() { }
//                               };
//                             }
//                           }
//                         };
//                       }
//                     }
//                   };
//                 }
//               };
//             }
//           }
//         }
//       ]
//     });
//   });

//   it('should instantiate a toast without a custom component',
//     () => {
//       instance = new SkyToastInstance('My message', undefined, 'danger', []);
//       let toast: SkyToastComponent;
//       try {
//         toast = new SkyToastComponent(undefined, undefined);
//         toast.instance = instance;

//         toast.ngOnInit();
//         expect((toast as any).customComponent).toBeFalsy();

//         toast.ngOnDestroy();
//         expect((toast as any).customComponent).toBeFalsy();
//       } catch (error) {
//         fail();
//       }
//       expect(toast).toBeTruthy();
//   });

//   it('should show proper closed or open states', () => {
//     instance = new SkyToastInstance('My message', undefined, 'danger', []);
//     let toast: SkyToastComponent = new SkyToastComponent(undefined, undefined);
//     toast.instance = instance;

//     toast.ngOnInit();

//     expect(toast.getAnimationState()).toBe('toastOpen');
//     instance.close();
//     toast.animationDone(undefined);
//     expect(toast.getAnimationState()).toBe('toastClosed');
//     expect(toast).toBeTruthy();
//   });

//   it('should instantiate a toast with a custom component and tear it down',
//     () => {
//       let clearCalled: boolean = false;
//       let createComponentCalled: boolean = false;
//       let destroyCalled: boolean = false;

//       instance = new SkyToastInstance(undefined, TestComponent, 'danger', []);

//       let toast: SkyToastComponent;
//       toast = new SkyToastComponent(TestBed.get(ComponentFactoryResolver), TestBed.get(Injector));
//       toast.instance = instance;

//       (toast as any).toastHost = {
//         clear: () => { clearCalled = true; },
//         createComponent: () => {
//           createComponentCalled = true;
//           return {
//             instance: {},
//             destroy: () => { destroyCalled = true; }
//           };
//         }
//       };

//       toast.ngOnInit();
//       expect((toast as any).customComponent).toBeTruthy();
//       expect(clearCalled).toBeTruthy();
//       expect(createComponentCalled).toBeTruthy();

//       toast.ngOnDestroy();
//       expect(destroyCalled).toBeTruthy();
//       expect(toast).toBeTruthy();
//   });
// });
