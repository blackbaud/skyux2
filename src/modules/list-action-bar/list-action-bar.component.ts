import { Component, Input, AfterContentInit } from '@angular/core';
import { ListState, ListStateDispatcher } from '../list/state';
import { ListSelectedSetItemsSelectedAction } from '../list/state/selected/actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'sky-list-action-bar',
  templateUrl: './list-action-bar.component.html',
  styleUrls: ['./list-action-bar.component.scss']
})
export class SkyListActionBarComponent implements AfterContentInit {
  @Input() public alwaysOn: boolean | Observable<boolean> = false;

  constructor(
    private state: ListState,
    private dispatcher: ListStateDispatcher
  ) {
  }

  public ngAfterContentInit() {
    if (this.alwaysOn && !(this.alwaysOn instanceof Observable)) {
      this.alwaysOn = Observable.of(this.alwaysOn);
    }
  }

  public get selectedItemCount(): Observable<number> {
    return this.state.map(s => {
      return Object.keys(s.selected.item).filter(id => s.selected.item[id] === true).length;
    }).distinctUntilChanged();
  }

  public selectAll(): void {
    this.state.map(s => s.items.items)
      .take(1)
      .subscribe(items => {
        this.dispatcher.next(new ListSelectedSetItemsSelectedAction(items.map(i => i.id), true));
      });
  }

  public clearAll(): void {
    this.state.map(s => s.selected.item)
      .take(1)
      .subscribe(selected => {
        this.dispatcher.next(new ListSelectedSetItemsSelectedAction(Object.keys(selected), false));
      });
  }
}
