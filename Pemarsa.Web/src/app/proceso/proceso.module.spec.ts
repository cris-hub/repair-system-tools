import { ProcesoModule } from './proceso.module';

describe('ProcesoModule', () => {
  let procesoModule: ProcesoModule;

  beforeEach(() => {
    procesoModule = new ProcesoModule();
  });

  it('should create an instance', () => {
    expect(procesoModule).toBeTruthy();
  });
});
