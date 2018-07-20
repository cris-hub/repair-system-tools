export enum TIPO_PROCESO {
  INSPECCIONENTRADA = 40,
  INSPECCIONSALIDA = 41
}

export enum TIPO_INSPECCION {
  'visualdimensional' = 65,
  'mpi' = 66,
  'lpi' = 67,
  'ut' = 68,
  'emi' = 69,
  'vr' = 70
}
export enum ESTADOS_INSPECCION {
  ENPROCESO = 77,
  ANULADA = 78
}
export enum ALERTAS_ERROR_TITULO {
  DatosObligatorios = 'Falta diligenciar datos'
}
export enum ALERTAS_ERROR_MENSAJE {
  DocumentosAdjuntos = 'Debe subir los documentos  adjunto obligatorios',
    Observaciones = 'Debe llenar las obervaciones'
}
