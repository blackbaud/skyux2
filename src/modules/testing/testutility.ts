function createEvent(eventName: string) {
  let evt = document.createEvent('CustomEvent');
  evt.initEvent(eventName, false, false);
  return evt;
}

export class TestUtility {
  public static fireDomEvent(el: any, name: string) {
    el.dispatchEvent(createEvent(name));
  }

  public static dispatchKeyboardEvent(element: Element, name: string, args?: KeyboardEventInit) {
    const options: KeyboardEventInit = Object.assign({
      key: 'Escape',
      bubbles: true,
      cancelable: true
    }, args);
    const event: KeyboardEvent = new KeyboardEvent(name, options);
    element.dispatchEvent(event);
  }
}
