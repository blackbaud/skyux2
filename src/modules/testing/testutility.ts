export interface SkyTestUtilityEventArgs {
  bubbles?: boolean;
  cancelable?: boolean;
}

export interface SkyTestUtilityKeyboardEventArgs {
  key?: string;
}

function createEvent(eventName: string, args?: SkyTestUtilityEventArgs): Event {
  args = Object.assign({
    bubbles: false,
    cancelable: false
  }, args);

  const event = document.createEvent('CustomEvent');
  event.initEvent(eventName, args.bubbles, args.cancelable);
  return event;
}

export class TestUtility {
  public static fireDomEvent(element: EventTarget, name: string, args: any = {}): Event {
    const event = createEvent(name, args);
    element.dispatchEvent(event);
    return event;
  }

  public static fireKeyboardEvent(element: EventTarget, name: string, args: KeyboardEventInit = {}): Event {
    let event = createEvent(name, {
      cancelable: true,
      bubbles: true
    }) as any;

    event = Object.assign(event, args);

    element.dispatchEvent(event as KeyboardEvent);

    return event;
  }
}
