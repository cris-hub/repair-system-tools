import { RemisionModule } from './remision.module';

describe('RemisionModule', () => {
  let remisionModule: RemisionModule;

  beforeEach(() => {
    remisionModule = new RemisionModule();
  });

  it('should create an instance', () => {
    expect(remisionModule).toBeTruthy();
  });
});
