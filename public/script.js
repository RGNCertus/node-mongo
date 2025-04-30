const sala = document.getElementById("sala");
const butacasSeleccionadas = document.getElementById("butacas");

const filas = 7;
const columnas = 16;
const columnasSilla = 3;

let seleccionadas = [];

for (let i = 0; i < filas; i++) {
  const fila = document.createElement("div");
  fila.classList.add("fila");

  for (let j = 0; j < columnas; j++) {
    const asiento = document.createElement("div");
    asiento.classList.add("circle", "disponible");

    if ((i === 1 && j === 5) || (i === 2 && j === 4) || (i === 3 && j === 6)) {
      asiento.classList.remove("disponible");
      asiento.classList.add("ocupada");
    }

    asiento.dataset.id = `${i}-${j}`;

    asiento.addEventListener("click", () => {
      if (asiento.classList.contains("ocupada")) return;

      if (asiento.classList.contains("seleccionada")) {
        asiento.classList.remove("seleccionada");
        seleccionadas = seleccionadas.filter(id => id !== asiento.dataset.id);
      } else {
        asiento.classList.add("seleccionada");
        seleccionadas.push(asiento.dataset.id);
      }

      butacasSeleccionadas.textContent = seleccionadas.join(", ");
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
