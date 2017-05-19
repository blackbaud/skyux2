export class SkyModalInstanceMock {
  public close() {}
}

export class MockHostService {
  public getModalZIndex(): number {
    return 1;
  }
}
