const jsonServer = require('json-server');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();

// Configuración del puerto para producción
const PORT = process.env.PORT || 8080;

// Datos iniciales
const data = {
  "services": [
    {
      "id": 1,
      "id_service": 1,
      "id_business": "123e4567-e89b-12d3-a456-426614174000",
      "name": "Servicio de Consultoría",
      "description": "Descripción del servicio de consultoría",
      "labels": [],
      "photo_url": "https://example.com/foto1.png",
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
    }
  ],
  "reports": [
    {
      "id": 1,
      "id_service": 1,
      "reason": "Incumplimiento de términos",
      "description": "El servicio no se prestó como se acordó",
      "report_date": "2024-09-01T12:34:56Z"
    }
  ],
  "service_labels": []
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