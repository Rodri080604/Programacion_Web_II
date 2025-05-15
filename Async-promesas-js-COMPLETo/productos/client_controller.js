import { productoService } from "../service/producto-service.js";

const crear_nueva_fila = (nombre, precio, descripcion, id) => {
    const fila = document.createElement('tr');
    const contenido = `
        <td class="td" data-td>
            ${nombre}
        </td>
        <td>${precio}</td>
        <td>${descripcion}</td>
        <td>
            <ul class="table__button-control">
                <li>
                    <a
                        href="../screens/editar_producto.html?id=${id}"
                        class="simple-button simple-button--edit"
                    >
                        Editar
                    </a>
                </li>
                <li>
                    <button
                        class="simple-button simple-button--delete"
                        type="button"
                        id="${id}"
                    >
                        Eliminar
                    </button>
                </li>
            </ul>
        </td>
    `;
    fila.innerHTML = contenido;
    const btn = fila.querySelector("button");
    btn.addEventListener("click", () => {
        const id = btn.id;
        productoService.eliminarProducto(id)
            .then(respuesta => {
                if (respuesta.error) {
                    throw new Error(respuesta.error);
                }
                alert("Producto eliminado correctamente");
                location.reload(); // Recarga la página para actualizar la lista
            })
            .catch(error => alert(`Error al eliminar: ${error.message}`));
    });

    return fila;
};

const table = document.querySelector("[data-table]");
productoService
    .listaProductos()
    .then((data) => {
        data.forEach(({ Nombre, Precio, Descripcion, Id }) => {
            const nuevaLinea = crear_nueva_fila(Nombre, Precio, Descripcion, Id);
            table.appendChild(nuevaLinea);
        });

        console.log(data); // Verifico los datos
    })
    .catch((error) => alert("Ocurrió un error"));