import { EntityModel } from "./EntityModel";

export class ClienteLineaModel extends EntityModel {
  public ContactoCorreo: string; 
  public ContactoNombre: string; 
  public ContactoTelefono: string; 
  public Direccion: string;
  public Activa: boolean;
  public Nombre: string;
  public ClienteId: number; 
}
