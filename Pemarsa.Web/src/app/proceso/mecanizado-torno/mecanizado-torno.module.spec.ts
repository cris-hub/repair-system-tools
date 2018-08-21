import { MecanizadoTornoModule } from './mecanizado-torno.module';

describe('MecanizadoTornoModule', () => {
  let mecanizadoTornoModule: MecanizadoTornoModule;

  beforeEach(() => {
    mecanizadoTornoModule = new MecanizadoTornoModule();
  });

  it('should create an instance', () => {
    expect(mecanizadoTornoModule).toBeTruthy();
  });
});
