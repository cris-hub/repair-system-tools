import { SoldaduraModule } from './soldadura.module';

describe('SoldaduraModule', () => {
  let soldaduraModule: SoldaduraModule;

  beforeEach(() => {
    soldaduraModule = new SoldaduraModule();
  });

  it('should create an instance', () => {
    expect(soldaduraModule).toBeTruthy();
  });
});
