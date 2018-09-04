import { OitTerminadasModule } from './oit-terminadas.module';

describe('OitTerminadasModule', () => {
  let oitTerminadasModule: OitTerminadasModule;

  beforeEach(() => {
    oitTerminadasModule = new OitTerminadasModule();
  });

  it('should create an instance', () => {
    expect(oitTerminadasModule).toBeTruthy();
  });
});
