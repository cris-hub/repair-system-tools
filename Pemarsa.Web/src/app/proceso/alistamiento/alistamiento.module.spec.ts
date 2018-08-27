import { AlistamientoModule } from './alistamiento.module';

describe('AlistamientoModule', () => {
  let alistamientoModule: AlistamientoModule;

  beforeEach(() => {
    alistamientoModule = new AlistamientoModule();
  });

  it('should create an instance', () => {
    expect(alistamientoModule).toBeTruthy();
  });
});
