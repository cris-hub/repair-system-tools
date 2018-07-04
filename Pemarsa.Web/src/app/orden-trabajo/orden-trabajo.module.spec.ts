import { OrdenTrabajoModule } from './orden-trabajo.module';

describe('OrdenTrabajoModule', () => {
  let ordenTrabajoModule: OrdenTrabajoModule;

  beforeEach(() => {
    ordenTrabajoModule = new OrdenTrabajoModule();
  });

  it('should create an instance', () => {
    expect(ordenTrabajoModule).toBeTruthy();
  });
});
