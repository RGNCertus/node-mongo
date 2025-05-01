const mongoose = require('mongoose');

const ButacaSchema = new mongoose.Schema({
  butacas: {
    type: [String],
    required: true,
    validate: {
      validator: function(arr) {
        return arr.every(item => /^\d+-\d+$/.test(item));
      },
      message: 'Formato de butaca inválido (debe ser "fila-columna")'
    }
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Butaca', ButacaSchema);