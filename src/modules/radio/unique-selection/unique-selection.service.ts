import {
  Injectable,
  OnDestroy
} from '@angular/core';
import {
  UniqueSelectionListener
} from './unique-selection-listener';

@Injectable()
export class UniqueSelectionService implements OnDestroy {
  private _listeners: UniqueSelectionListener[] = [];

  public notify(id: string, name: string) {
    for (let listener of this._listeners) {
      listener(id, name);
    }
  }

  public listen(listener: UniqueSelectionListener): () => void {
    this._listeners.push(listener);
    return () => {
      this._listeners = this._listeners.filter((registered: UniqueSelectionListener) => {
        return listener !== registered;
      });
    };
  }

  public ngOnDestroy() {
    this._listeners = [];
  }
}
