const express = require('express');
const mongoose = require('mongoose');
const Butaca = require('./models/Person');
const app = express();

// Configuración básica
app.use(express.static('public'));
app.use(express.json());

// Conexión a MongoDB (REEMPLAZA CON TU URL)
const MONGO_URI = "mongodb+srv://rodrigogrimaldo568:MondoDBfirstclass@cluster0.uyvdpqc.mongodb.net/";

mongoose.connect(MONGO_URI)
  .then(() => console.log('🟢 Conectado a MongoDB'))
  .catch(err => console.error('🔴 Error de conexión:', err));

// Ruta para guardar butacas
app.post('/submit', async (req, res) => {
  try {
    if (!req.body.butacas || !Array.isArray(req.body.butacas)) {
      return res.status(400).json({ 
        success: false,
        message: 'Formato de butacas inválido' 
      });
    }

    const nuevaButaca = new Butaca({
      butacas: req.body.butacas
    });

    await nuevaButaca.save();

    res.status(200).json({
      success: true,
      message: 'Butacas guardadas exitosamente',
      butacas: nuevaButaca.butacas
    });
  } catch (error) {
    console.error('Error al guardar:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🎥 Servidor Cineplanet en puerto ${PORT}`);
});