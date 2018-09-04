import { RectificadoModule } from './rectificado.module';

describe('RectificadoModule', () => {
  let rectificadoModule: RectificadoModule;

  beforeEach(() => {
    rectificadoModule = new RectificadoModule();
  });

  it('should create an instance', () => {
    expect(rectificadoModule).toBeTruthy();
  });
});
