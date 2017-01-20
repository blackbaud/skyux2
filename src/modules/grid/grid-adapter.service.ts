import {
  Injectable
} from '@angular/core';

import { DragulaService } from 'ng2-dragula/ng2-dragula';

@Injectable()
export class SkyGridAdapterService {

  public initializeDragAndDrop(
    dragulaService: DragulaService,
    dropCallback: (newColumnIds: Array<string>) => void) {
    dragulaService.drag.subscribe(([, source]: Array<HTMLElement>) =>
      source.classList.add('sky-grid-header-dragging')
    );

    dragulaService.dragend.subscribe(([, source]: Array<HTMLElement>) =>
      source.classList.remove('sky-grid-header-dragging')
    );

    dragulaService.drop.subscribe(([,, container]: Array<HTMLElement>) => {
      let columnIds: string[] = [];
      let nodes = container.getElementsByTagName('th');
      for (let i = 0; i < nodes.length; i++) {
        let el = nodes[i];
        let id = el.getAttribute('sky-cmp-id');
        columnIds.push(id);
      }
      dropCallback(columnIds);

    });

    dragulaService.setOptions('sky-grid-heading', {
      moves: (el: HTMLElement) => !el.matches('sky-grid-header-locked'),
      accepts: (
        el: HTMLElement,
        target: HTMLElement,
        source: HTMLElement,
        sibling: HTMLElement) =>
        sibling === undefined || !sibling.matches('sky-grid-header-locked')
    });
  }
}
