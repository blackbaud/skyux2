import {
  Injectable,
  OnDestroy
} from '@angular/core';
import {
  SkyUniqueRadioSelectionListener
} from './unique-radio-selection-listener';

@Injectable()
export class SkyUniqueRadioSelectionService implements OnDestroy {
  private _listeners: SkyUniqueRadioSelectionListener[] = [];

  public notify(id: string, name: string) {
    for (let listener of this._listeners) {
      listener(id, name);
    }
  }

  public listen(listener: SkyUniqueRadioSelectionListener): () => void {
    this._listeners.push(listener);
    return () => {
      this._listeners = this._listeners.filter((registered: SkyUniqueRadioSelectionListener) => {
        return listener !== registered;
      });
    };
  }

  public ngOnDestroy() {
    this._listeners = [];
  }
}
