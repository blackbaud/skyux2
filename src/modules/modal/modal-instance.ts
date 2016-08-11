export class SkyModalInstance {
  public componentInstance: any;

  private closeCallback: Function;

  constructor() {}

  public setCloseCallback(closeCallback: Function) {
    this.closeCallback = closeCallback;
  }

  public close() {
    if (this.closeCallback) {
      this.closeCallback();
    }
  }
}
