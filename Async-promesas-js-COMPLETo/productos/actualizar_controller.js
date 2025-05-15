import { productoService } from "../service/producto-service.js";
const formulario = document.querySelector("[data-form]");

const obtenerInfo = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    if (!id) {
        console.error("ID no proporcionado en la URL");
        window.location.href = "../screens/error.html";
        return;
    }

    const nombre = document.querySelector("[data-nombre]");
    const precio = document.querySelector("[data-precio]");
    const descripcion = document.querySelector("[data-descripcion]");

    try {
        const producto = await productoService.productos(id);
        console.log("Producto recibido:", producto);
        if (!producto || !producto.Nombre || !producto.Precio || !producto.Descripcion) {
            console.error("Producto no encontrado o datos incompletos:", producto);
            throw new Error("Producto no encontrado o datos incompletos");
        }
        nombre.value = producto.Nombre;
        precio.value = producto.Precio;
        descripcion.value = producto.Descripcion;
    } catch (error) {
        console.error("Error al cargar producto:", error.message);
        window.location.href = "../screens/error.html";
    }
};
obtenerInfo();

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    const nombre = document.querySelector('[data-nombre]').value.trim();
    const precio = parseFloat(document.querySelector('[data-precio]').value.trim());
    const descripcion = document.querySelector('[data-descripcion]').value.trim();

    if (!nombre || isNaN(precio) || !descripcion) {
        alert("Por favor, completa todos los campos con datos válidos.");
        return;
    }
    if (precio <= 0) {
        alert("El precio debe ser mayor que cero.");
        return;
    }

    productoService.actualizarProducto(nombre, precio, descripcion, id)
        .then((respuesta) => {
            console.log("Respuesta de actualización:", respuesta);
            if (respuesta.error) {
                throw new Error(respuesta.error);
            }
            window.location.href = "../screens/edicion_concluida.html";
        })
        .catch((error) => {
            console.error("Error al actualizar:", error.message);
            window.location.href = "../screens/error.html";
        });
});