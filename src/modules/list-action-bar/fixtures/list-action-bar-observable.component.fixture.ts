import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'sky-test-cmp',
  template: require('./list-action-bar-observable.component.fixture.html')
})
export class ListActionBarObservableTestComponent {
  public get on(): Observable<boolean> {
    return Observable.of(true);
  }
}
