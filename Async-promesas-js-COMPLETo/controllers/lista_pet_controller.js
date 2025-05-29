import { petService } from "../service/pet-service.js";

const tabla = document.querySelector("[data-tabla-pets]");

const crearFila = (nombre, especie, edad, id) => {
  const fila = document.createElement("tr");
  fila.innerHTML = `
    <td>${nombre}</td>
    <td>${especie}</td>
    <td>${edad}</td>
    <td><button data-id="${id}" class="btn-eliminar">Eliminar</button></td>
  `;

  fila.querySelector(".btn-eliminar").addEventListener("click", async () => {
    try {
      await petService.eliminarPet(id);
      fila.remove();
    } catch {
      alert("Error al eliminar mascota");
    }
  });

  return fila;
};

petService.listaPets()
  .then(pets => {
    pets.forEach(p => {
      const fila = crearFila(p.nombre, p.especie, p.edad, p.id);
      tabla.appendChild(fila);
    });
  })
  .catch(() => alert("Error al cargar mascotas"));




  const inputBuscar = document.getElementById('buscador');

inputBuscar.addEventListener('input', () => {
  const valor = inputBuscar.value.toLowerCase();
  const filas = document.querySelectorAll("tbody tr");

  filas.forEach(fila => {
    const nombre = fila.querySelector("td").textContent.toLowerCase();
    if (nombre.includes(valor)) {
      fila.style.display = "";
    } else {
      fila.style.display = "none";
    }
  });
});