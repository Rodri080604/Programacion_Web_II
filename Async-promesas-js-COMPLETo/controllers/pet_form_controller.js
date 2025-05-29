import { petService } from "../service/pet-service.js";

const form = document.querySelector("[data-formulario]");
const inputNombre = document.querySelector("[data-nombre]");
const inputEspecie = document.querySelector("[data-especie]");
const inputEdad = document.querySelector("[data-edad]");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nombre = inputNombre.value.trim();
  const especie = inputEspecie.value.trim();
  const edad = inputEdad.value.trim();

  if (!nombre || !especie || !edad) {
    alert("Todos los campos son obligatorios");
    return;
  }

  try {
    await petService.crearPet(nombre, especie, edad);
    window.location.href = "lista_pet.html";
  } catch (error) {
    alert("Error al registrar mascota");
  }
});