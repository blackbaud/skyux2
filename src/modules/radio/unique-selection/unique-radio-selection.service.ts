import {
  Injectable,
  OnDestroy
} from '@angular/core';
import {
  UniqueRadioSelectionListener
} from './unique-selection-listener';

@Injectable()
export class UniqueRadioSelectionService implements OnDestroy {
  private _listeners: UniqueRadioSelectionListener[] = [];

  public notify(id: string, name: string) {
    for (let listener of this._listeners) {
      listener(id, name);
    }
  }

  public listen(listener: UniqueRadioSelectionListener): () => void {
    this._listeners.push(listener);
    return () => {
      this._listeners = this._listeners.filter((registered: UniqueRadioSelectionListener) => {
        return listener !== registered;
      });
    };
  }

  public ngOnDestroy() {
    this._listeners = [];
  }
}
