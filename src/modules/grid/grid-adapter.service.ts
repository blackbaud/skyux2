import {
  Injectable
} from '@angular/core';

import { DragulaService } from 'ng2-dragula/ng2-dragula';

const GRID_HEADER_DRAGGING_CLASS = 'sky-grid-header-dragging';
const GRID_HEADER_LOCKED_SELECTOR = '.sky-grid-header-locked';

@Injectable()
export class SkyGridAdapterService {

  public initializeDragAndDrop(
    dragulaService: DragulaService,
    dropCallback: (newColumnIds: Array<string>) => void) {
    dragulaService.drag.subscribe(([, source]: Array<HTMLElement>) =>
      source.classList.add(GRID_HEADER_DRAGGING_CLASS)
    );

    dragulaService.dragend.subscribe(([, source]: Array<HTMLElement>) =>
      source.classList.remove(GRID_HEADER_DRAGGING_CLASS)
    );

    dragulaService.drop.subscribe(([, , container]: Array<HTMLElement>) => {
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
      moves: (el: HTMLElement, container: HTMLElement, handle: HTMLElement) => {
        return handle !== undefined && !handle.matches(GRID_HEADER_LOCKED_SELECTOR);
      },
      accepts: (
        el: HTMLElement,
        target: HTMLElement,
        source: HTMLElement,
        sibling: HTMLElement) => {
          return sibling === undefined || !sibling || !sibling.matches(GRID_HEADER_LOCKED_SELECTOR);
        }
    });
  }
}
