import { EntityModel } from "./EntityModel";
import { HerramientaModel } from "./HerramientaModel";

export class HerramientaEstudioFactibilidadModel extends EntityModel {
  public Admin: boolean;
  public ManoObra: boolean;
  public Mantenimiento: boolean;
  public Maquina: boolean;
  public Material: boolean;
  public Metodo: boolean;
  public HerramientaId: number;
  public Herramienta: HerramientaModel;
}
