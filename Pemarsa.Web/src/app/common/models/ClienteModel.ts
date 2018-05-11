import { AttachmentModel } from './AttachmentModel';
import { CatalogoModel } from './CatalogoModel';
import { EntityModel } from './EntityModel';
import { ClienteLineaModel } from './ClienteLineaModel';

export class ClienteModel extends EntityModel  {
  public ContactoCorreo: string; 
  public ContactoNombre: string; 
  public ContactoTelefono: string; 
  public Direccion: string; 
  public EstadoId: number; 
  public GuidResponsable: string
  public Lineas: ClienteLineaModel[]; 
  public NickName: string; 
  public Nit: string 
  public NombreResponsable: string; 
  public RazonSocial: string 
  public Telefono: string 
  public DocumentoAdjuntoId: number; 
  public Estado: CatalogoModel;  
  public Rut: AttachmentModel;

  constructor() {
    super();
    this.Rut = new AttachmentModel();
    this.Estado = new CatalogoModel();
    this.Lineas = new Array<ClienteLineaModel>();
  }
}
