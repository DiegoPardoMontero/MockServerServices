const jsonServer = require('json-server');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();

// Configuración del puerto para producción
const PORT = process.env.PORT || 8082;

// Datos iniciales
// ... (configuración inicial igual)

// Datos iniciales expandidos
const data = {
  "services": [
    {
      "id": 1,
      "id_service": 1,
      "id_business": "123e4567-e89b-12d3-a456-426614174000",
      "name": "Servicio de Consultoría Empresarial",
      "description": "Asesoramiento estratégico para optimización de procesos y crecimiento empresarial",
      "labels": [],
      "photo_url": "https://example.com/consultoria.png",
      "state": "active"
    },
    {
      "id": 2,
      "id_service": 2,
      "id_business": "223e4567-e89b-12d3-a456-426614174001",
      "name": "Desarrollo Web Full Stack",
      "description": "Desarrollo de aplicaciones web modernas y responsivas con las últimas tecnologías",
      "labels": [],
      "photo_url": "https://example.com/desarrollo.png",
      "state": "active"
    },
    {
      "id": 3,
      "id_service": 3,
      "id_business": "323e4567-e89b-12d3-a456-426614174002",
      "name": "Marketing Digital",
      "description": "Estrategias de marketing digital, SEO y gestión de redes sociales",
      "labels": [],
      "photo_url": "https://example.com/marketing.png",
      "state": "active"
    },
    {
      "id": 4,
      "id_service": 4,
      "id_business": "423e4567-e89b-12d3-a456-426614174003",
      "name": "Diseño Gráfico Profesional",
      "description": "Servicios de diseño gráfico para marca, publicidad y redes sociales",
      "labels": [],
      "photo_url": "https://example.com/diseno.png",
      "state": "paused"
    },
    {
      "id": 5,
      "id_service": 5,
      "id_business": "523e4567-e89b-12d3-a456-426614174004",
      "name": "Soporte Técnico 24/7",
      "description": "Servicio de soporte técnico para hardware y software empresarial",
      "labels": [],
      "photo_url": "https://example.com/soporte.png",
      "state": "active"
    }
  ],
  "labels": [
    {
      "id": 1,
      "id_label": 1,
      "label": "Consultoría"
    },
    {
      "id": 2,
      "id_label": 2,
      "label": "Negocios"
    },
    {
      "id": 3,
      "id_label": 3,
      "label": "Desarrollo"
    },
    {
      "id": 4,
      "id_label": 4,
      "label": "Tecnología"
    },
    {
      "id": 5,
      "id_label": 5,
      "label": "Marketing"
    },
    {
      "id": 6,
      "id_label": 6,
      "label": "Digital"
    },
    {
      "id": 7,
      "id_label": 7,
      "label": "Diseño"
    },
    {
      "id": 8,
      "id_label": 8,
      "label": "Soporte"
    },
    {
      "id": 9,
      "id_label": 9,
      "label": "Premium"
    },
    {
      "id": 10,
      "id_label": 10,
      "label": "24/7"
    }
  ],
  "reports": [
    {
      "id": 1,
      "id_service": 1,
      "reason": "Incumplimiento de plazos",
      "description": "El consultor no entregó los informes en las fechas acordadas",
      "report_date": "2024-09-01T12:34:56Z"
    },
    {
      "id": 2,
      "id_service": 1,
      "reason": "Calidad insuficiente",
      "description": "Los entregables no cumplen con el nivel de detalle esperado",
      "report_date": "2024-09-05T15:23:11Z"
    },
    {
      "id": 3,
      "id_service": 2,
      "reason": "Errores en producción",
      "description": "La aplicación presenta errores críticos después del despliegue",
      "report_date": "2024-08-15T09:45:30Z"
    },
    {
      "id": 4,
      "id_service": 2,
      "reason": "Problemas de rendimiento",
      "description": "El sitio web tiene tiempos de carga superiores a lo acordado",
      "report_date": "2024-08-20T14:12:45Z"
    },
    {
      "id": 5,
      "id_service": 3,
      "reason": "Resultados insatisfactorios",
      "description": "No se alcanzaron los KPIs prometidos en la campaña",
      "report_date": "2024-07-28T11:33:22Z"
    },
    {
      "id": 6,
      "id_service": 4,
      "reason": "Diseños no originales",
      "description": "Se detectaron elementos gráficos copiados de otros diseños",
      "report_date": "2024-10-02T16:55:40Z"
    },
    {
      "id": 7,
      "id_service": 5,
      "reason": "Tiempo de respuesta excesivo",
      "description": "El tiempo de respuesta supera las 2 horas acordadas en SLA",
      "report_date": "2024-09-15T08:20:15Z"
    },
    {
      "id": 8,
      "id_service": 5,
      "reason": "Soporte inadecuado",
      "description": "El personal de soporte no está capacitado para resolver problemas avanzados",
      "report_date": "2024-09-18T10:40:33Z"
    }
  ],
  "service_labels": [
    {
      "id_service": 1,
      "id_label": 1
    },
    {
      "id_service": 1,
      "id_label": 2
    },
    {
      "id_service": 2,
      "id_label": 3
    },
    {
      "id_service": 2,
      "id_label": 4
    },
    {
      "id_service": 3,
      "id_label": 5
    },
    {
      "id_service": 3,
      "id_label": 6
    },
    {
      "id_service": 4,
      "id_label": 7
    },
    {
      "id_service": 5,
      "id_label": 8
    },
    {
      "id_service": 5,
      "id_label": 9
    },
    {
      "id_service": 5,
      "id_label": 10
    }
  ]
};

const router = jsonServer.router(data);

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  res.header('Content-Type', 'application/json');
  res.header('Accept', 'application/json');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});

// Rutas personalizadas
server.get('/api/v1/services/:id_service/report', (req, res) => {
  const reports = router.db
    .get('reports')
    .filter({ id_service: parseInt(req.params.id_service) })
    .value();

  if (reports.length) {
    res.json(reports);
  } else {
    res.status(404).json({
      code: "404",
      message: "No se encontraron reportes para este servicio."
    });
  }
});

server.post('/api/v1/labels', (req, res) => {
  try {
    const labels = router.db.get('labels');
    const newId = labels.size().value() + 1;
    
    const newLabel = {
      id: newId,
      id_label: newId,
      label: req.body.label
    };
    
    labels.push(newLabel).write();
    
    res.status(201).json(newLabel);
  } catch (error) {
    res.status(400).json({
      code: "400",
      message: "Error al crear la etiqueta"
    });
  }
});

// Nueva ruta para agregar etiqueta a servicio
server.post('/api/v1/services/:id_service/labels/:id_label', (req, res) => {
  try {
    const serviceId = parseInt(req.params.id_service);
    const labelId = parseInt(req.params.id_label);

    // Verificar si existe el servicio
    const service = router.db
      .get('services')
      .find({ id_service: serviceId })
      .value();

    if (!service) {
      return res.status(404).json({
        code: "404",
        message: "Servicio no encontrado."
      });
    }

    // Verificar si existe la etiqueta
    const label = router.db
      .get('labels')
      .find({ id_label: labelId })
      .value();

    if (!label) {
      return res.status(404).json({
        code: "404",
        message: "Etiqueta no encontrada."
      });
    }

    // Verificar si la etiqueta ya está asociada al servicio
    const existingLabel = router.db
      .get('service_labels')
      .find({ id_service: serviceId, id_label: labelId })
      .value();

    if (existingLabel) {
      return res.status(400).json({
        code: "400",
        message: "La etiqueta ya está asociada a este servicio."
      });
    }

    // Agregar la relación
    router.db
      .get('service_labels')
      .push({ id_service: serviceId, id_label: labelId })
      .write();

    // Actualizar el array de labels en el servicio
    const serviceLabels = router.db
      .get('service_labels')
      .filter({ id_service: serviceId })
      .map(sl => {
        const labelInfo = router.db
          .get('labels')
          .find({ id_label: sl.id_label })
          .value();
        return labelInfo.label;
      })
      .value();

    router.db
      .get('services')
      .find({ id_service: serviceId })
      .assign({ labels: serviceLabels })
      .write();

    // Devolver el servicio actualizado
    const updatedService = router.db
      .get('services')
      .find({ id_service: serviceId })
      .value();

    res.json(updatedService);
  } catch (error) {
    res.status(500).json({
      code: "500",
      message: "Error al agregar la etiqueta al servicio."
    });
  }
});

// Nueva ruta para eliminar etiqueta de un servicio
server.delete('/api/v1/services/:id_service/labels/:id_label', (req, res) => {
  try {
    const serviceId = parseInt(req.params.id_service);
    const labelId = parseInt(req.params.id_label);

    // Verificar si existe el servicio
    const service = router.db
      .get('services')
      .find({ id_service: serviceId })
      .value();

    if (!service) {
      return res.status(404).json({
        code: "404",
        message: "Servicio no encontrado."
      });
    }

    // Eliminar la relación
    router.db
      .get('service_labels')
      .remove({ id_service: serviceId, id_label: labelId })
      .write();

    // Actualizar el array de labels en el servicio
    const serviceLabels = router.db
      .get('service_labels')
      .filter({ id_service: serviceId })
      .map(sl => {
        const labelInfo = router.db
          .get('labels')
          .find({ id_label: sl.id_label })
          .value();
        return labelInfo.label;
      })
      .value();

    router.db
      .get('services')
      .find({ id_service: serviceId })
      .assign({ labels: serviceLabels })
      .write();

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      code: "500",
      message: "Error al eliminar la etiqueta del servicio."
    });
  }
});

server.use('/api/v1', router);

server.listen(PORT, () => {
  console.log(`JSON Server está corriendo en el puerto ${PORT}`);
});

// Rutas personalizadas para reportes
// GET todos los reportes
server.get('/api/v1/reports', (req, res) => {
  const reports = router.db.get('reports').value();
  res.json(reports);
});

// GET reportes por servicio
server.get('/api/v1/services/:id_service/reports', (req, res) => {
  const serviceId = parseInt(req.params.id_service);
  
  // Verificar si existe el servicio
  const service = router.db
    .get('services')
    .find({ id_service: serviceId })
    .value();

  if (!service) {
    return res.status(404).json({
      code: "404",
      message: "Servicio no encontrado."
    });
  }

  const reports = router.db
    .get('reports')
    .filter({ id_service: serviceId })
    .value();

  if (reports.length) {
    res.json(reports);
  } else {
    res.status(404).json({
      code: "404",
      message: "No se encontraron reportes para este servicio."
    });
  }
});

// POST crear nuevo reporte
server.post('/api/v1/services/:id_service/reports', (req, res) => {
  try {
    const serviceId = parseInt(req.params.id_service);
    
    // Verificar si existe el servicio
    const service = router.db
      .get('services')
      .find({ id_service: serviceId })
      .value();

    if (!service) {
      return res.status(404).json({
        code: "404",
        message: "Servicio no encontrado."
      });
    }

    const reports = router.db.get('reports');
    const newId = reports.size().value() + 1;

    const newReport = {
      id: newId,
      id_service: serviceId,
      reason: req.body.reason,
      description: req.body.description,
      report_date: new Date().toISOString()
    };

    reports.push(newReport).write();
    res.status(201).json(newReport);
  } catch (error) {
    res.status(500).json({
      code: "500",
      message: "Error al crear el reporte."
    });
  }
});

// DELETE eliminar un reporte específico
server.delete('/api/v1/reports/:id', (req, res) => {
  try {
    const reportId = parseInt(req.params.id);
    
    // Verificar si existe el reporte
    const report = router.db
      .get('reports')
      .find({ id: reportId })
      .value();

    if (!report) {
      return res.status(404).json({
        code: "404",
        message: "Reporte no encontrado."
      });
    }

    // Eliminar el reporte
    router.db
      .get('reports')
      .remove({ id: reportId })
      .write();

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      code: "500",
      message: "Error al eliminar el reporte."
    });
  }
});

// ... (el resto del código se mantiene igual)