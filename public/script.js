// Elementos del DOM
const sala = document.getElementById("sala");
const butacasSeleccionadas = document.getElementById("butacas");
const butacasInput = document.getElementById("butacasInput");
const continuarBtn = document.getElementById("continuarBtn");
const reservaForm = document.getElementById("reservaForm");

// Configuración de la sala
const filas = 7;
const columnas = 16;
const columnasSilla = 3;

let seleccionadas = [];

// Crear la sala de butacas
for (let i = 0; i < filas; i++) {
  const fila = document.createElement("div");
  fila.classList.add("fila");

  for (let j = 0; j < columnas; j++) {
    const asiento = document.createElement("div");
    asiento.classList.add("circle", "disponible");

    // Marcar algunos asientos como ocupados (ejemplos)
    if ((i === 1 && j === 5) || (i === 2 && j === 4) || (i === 3 && j === 6)) {
      asiento.classList.remove("disponible");
      asiento.classList.add("ocupada");
    }

    asiento.dataset.id = `${i}-${j}`;

    // Evento click para seleccionar/deseleccionar butacas
    asiento.addEventListener("click", () => {
      if (asiento.classList.contains("ocupada")) return;

      if (asiento.classList.contains("seleccionada")) {
        asiento.classList.remove("seleccionada");
        seleccionadas = seleccionadas.filter(id => id !== asiento.dataset.id);
      } else {
        asiento.classList.add("seleccionada");
        seleccionadas.push(asiento.dataset.id);
      }

      // Actualizar la visualización
      butacasSeleccionadas.textContent = seleccionadas.join(", ");
      butacasInput.value = seleccionadas.join(",");
      
      // Habilitar/deshabilitar botón
      continuarBtn.disabled = seleccionadas.length === 0;
    });

    fila.appendChild(asiento);
  }

  // Agregar sillas de ruedas en las primeras filas
  if (i < 4) {
    for (let k = 0; k < columnasSilla; k++) {
      const silla = document.createElement("div");
      silla.classList.add("circle", "silla");
      silla.textContent = "♿";
      fila.appendChild(silla);
    }
  }

  sala.appendChild(fila);
}

// Manejar envío del formulario
reservaForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  try {
    const response = await fetch('/submit', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ butacas: seleccionadas })
    });

    const result = await response.json();

    if (response.ok) {
      alert(`Butacas guardadas: ${seleccionadas.join(', ')}`);
      
      // Resetear selección
      seleccionadas.forEach(id => {
        const asiento = document.querySelector(`[data-id="${id}"]`);
        if (asiento) {
          asiento.classList.remove("seleccionada");
          asiento.classList.add("disponible");
        }
      });
      
      seleccionadas = [];
      butacasSeleccionadas.textContent = '';
      continuarBtn.disabled = true;
    } else {
      alert(result.message || "Error al guardar butacas");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error de conexión con el servidor");
  }
});