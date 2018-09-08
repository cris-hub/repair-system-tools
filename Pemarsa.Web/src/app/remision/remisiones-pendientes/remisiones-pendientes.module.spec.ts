import { RemisionesPendientesModule } from './remisiones-pendientes.module';

describe('RemisionesPendientesModule', () => {
  let remisionesPendientesModule: RemisionesPendientesModule;

  beforeEach(() => {
    remisionesPendientesModule = new RemisionesPendientesModule();
  });

  it('should create an instance', () => {
    expect(remisionesPendientesModule).toBeTruthy();
  });
});
