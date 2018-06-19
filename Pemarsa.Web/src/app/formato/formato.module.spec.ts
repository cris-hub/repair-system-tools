import { FormatoModule } from './formato.module';

describe('FormatoModule', () => {
  let formatoModule: FormatoModule;

  beforeEach(() => {
    formatoModule = new FormatoModule();
  });

  it('should create an instance', () => {
    expect(formatoModule).toBeTruthy();
  });
});
