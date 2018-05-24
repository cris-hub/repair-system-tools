﻿using Pemarsa.CanonicalModels;
using Pemarsa.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace OrdenTrabajoES.Repository
{
    public interface IOrdenTrabajoRepository
    {
        Task<Guid> CrearSolicitudDeTrabajo(SolicitudOrdenTrabajo solicitudOrdenTrabajo);
        Task<SolicitudOrdenTrabajo> ConsultarSolicitudDeTrabajoPorGuid(Guid guidSolicitudOrdenTrabajo);
        Task<Tuple<int, IEnumerable<SolicitudOrdenTrabajo>>> ConsultarSolicitudesDeTrabajo(Paginacion paginacion);
        Task<Tuple<int, IEnumerable<SolicitudOrdenTrabajo>>> ConsultarSolicitudesDeTrabajoPorFiltro(ParametrosSolicitudOrdenTrabajoDTO parametrosDTO);
        Task<bool> ActualizarEstadoSolicitudDeTrabajo(Guid guidSolicitudOrdenTrabajo, string estado);
    }
}
