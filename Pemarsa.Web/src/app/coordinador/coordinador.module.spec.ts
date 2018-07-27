import { CoordinadorModule } from './coordinador.module';

describe('CoordinadorModule', () => {
  let coordinadorModule: CoordinadorModule;

  beforeEach(() => {
    coordinadorModule = new CoordinadorModule();
  });

  it('should create an instance', () => {
    expect(coordinadorModule).toBeTruthy();
  });
});
