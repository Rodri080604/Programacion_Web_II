import { productService } from "../service/product-service.js";

const form = document.querySelector("[data-formulario]");
const inputNombre = document.querySelector("[data-nombre]");
const inputPrecio = document.querySelector("[data-precio]");
const inputDescripcion = document.querySelector("[data-descripcion]");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nombre = inputNombre.value.trim();
  const precio = inputPrecio.value.trim();
  const descripcion = inputDescripcion.value.trim();

  if (!nombre || !precio || !descripcion) {
    alert("Todos los campos son obligatorios");
    return;
  }

  try {
    await productService.crearProducto(nombre, precio, descripcion);
    window.location.href = "./lista_producto.html";
  } catch (error) {
    alert("Error al registrar producto");
    console.error(error);
  }
});