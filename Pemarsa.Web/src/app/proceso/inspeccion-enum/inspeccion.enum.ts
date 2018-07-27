export enum TIPO_PROCESO {
  INSPECCIONENTRADA = 40,
  INSPECCIONSALIDA = 41
}

export enum TIPO_INSPECCION {
  'visualdimensional' = 65,
  'visualdimensionalmotor' = 105,
  'mpi' = 66,
  'lpi' = 67,
  'ut' = 68,
  'uta' = 79,
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


export enum ALERTAS_OK_MENSAJE {
  InspeccionEliminar = 'Se ha eliminado la inspeccion exitosamente',
  InspeccionActualizada = 'Se ha realizado la inspeccion exitosamente',
  InspeccionCreada = 'Se ha creado una nueva inspeccion exitosamente',
  
}
export enum ALERTAS_ERROR_MENSAJE {
  InspeccionERRORactualizar = 'La Inspeccion no se ha podido actualizar',
  InspeccionEliminar = 'No se ha podido eliminar la inspeccion ',
  InspeccionERRORcrear = 'La Inspeccion no se ha podido crear',
  DocumentosAdjuntos = 'Debe subir los documentos  adjunto obligatorios',
  DocumentosAdjuntosFaltantes = 'Faltan documentos Adjuntos por subir',
  Observaciones = 'Debe llenar las obervaciones',
  LuzBlanca = 'Debe llenar el campo de Luz Blanca',
  Conexiones = 'Debe llenar el campo de Conexiones',
  EquipoMedicion = 'Debe llenar el campo de equipo medicion',
  LimiteDeDocumentosAdjuntosSuperdo = 'El limite de archivos adjuntos se a sobrepasodo, debe elimar un documento para realisar la operacion',
  ConcentracionUtilizada = 'Debe llenar  el campo de concentracion utilizada',
  FechaDePreparacion = 'Debe llenar  el campo de concentracion Fecha de preparación',
  Lote = 'Debe llenar  el campo de concentracion Fecha de lote',
  InspeccionLuzNegra = 'Debe llenar  el campo de concentracion inspeccion luz negra',
  IntensidadLuzNegra = 'Debe llenar  el campo de concentracion intensidad luz negra',
  InspeccionYoke = 'Debe llenar  el campo de concentracion intensidad inspeccion Yoke',
}
