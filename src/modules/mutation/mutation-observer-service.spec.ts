import { MutationObserverService } from './mutation-observer-service';

describe('Mutation observer service', () => {

  it('should return a new instance of a mutation observer', () => {
    let service = new MutationObserverService();
    let observer = service.create((mutations: MutationRecord[]) => 0);

    expect(observer).not.toBe(undefined);
    expect(observer).toEqual(jasmine.any(MutationObserver));
  });
});
