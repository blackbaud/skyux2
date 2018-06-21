import {
  Injectable
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { SkyUIConfigService } from '../../shared/ui-config.service';

@Injectable()
export class MockSkyUIConfigService extends SkyUIConfigService {
  public getConfig(key: string, defaultConfig?: any): any {
    switch (key) {
      case 'defaultSettings':
      return Observable.of(defaultConfig);
      case 'badData':
      return Observable.of({invalidProperty: 'invalidData'});
      case 'columnOrder':
      return Observable.of({
        settings: {
          userSettings: {
            gridColumnOrder: ['column2', 'composite', 'column3', 'column1'],
            sortByColumn: {
              fieldSelector: 'column3',
              descending: false
            }
          }
        }
      });
      case 'newColumnOrder':
      return Observable.of({
        settings: {
          userSettings: {
            gridColumnOrder: ['column2', 'composite', 'column1'],
            sortByColumn: {
              fieldSelector: 'column3',
              descending: false
            }
          }
        }
      });
      case 'oldColumnOrder':
      return Observable.of({
        settings: {
          userSettings: {
            gridColumnOrder: ['column2', 'column4', 'composite', 'column3', 'column1'],
            sortByColumn: {
              fieldSelector: 'column3',
              descending: false
            }
          }
        }
      });
      default: {
        return Observable.of({
          settings: {
            userSettings: {
                singleColumn: {
                  tiles: [
                    {
                      id: 'tile-1',
                      isCollapsed: true
                    },
                    {
                      id: 'tile-2',
                      isCollapsed: true
                    }
                  ]
                },
                multiColumn: [
                  {
                    tiles: [
                      {
                        id: 'tile-2',
                        isCollapsed: true
                      }
                    ]
                  },
                  {
                    tiles: [
                      {
                        id: 'tile-1',
                        isCollapsed: true
                      }
                    ]
                  }
                ]
            },
            defaultSettings: [
              'tile-1',
              'tile-2'
            ]
          }
        });
      }
    }
  }

  public setConfig(key: string, value: any) {
  }
}
