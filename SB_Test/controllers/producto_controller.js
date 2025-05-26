import { productoService } from "../services/producto-service.js";

const crear_nueva_fila = (nombre, precio, id) => {
    const fila = document.createElement('tr');
    const contenido = `
            <td class="td" data-td>
            ${nombre}
            </td>
            <td>${precio}</td>
            <td>
            <ul class="table__button-control">
                <li>
                    <a
                    href="../screens/editar_producto.html?id=${id}"
                    class="simple-button simple-button--edit"
                    >Editar</a
                    >
                </li>
                <li>
                    <button
                    class="simple-button simple-button--delete"
                    type="button" id="${id}">
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
                alert("Producto eliminado");
                window.location.reload();
            }).catch(error => {
                console.error("Error al eliminar:", error);
                alert("Error al eliminar el producto");
            });
    });

    return fila;
};

const table = document.querySelector("[data-table]");
productoService.listaProductos()
    .then((data) => {
        data.forEach(({ nombre, precio, id }) => {
            const nuevaLinea = crear_nueva_fila(nombre, precio, id);
            table.appendChild(nuevaLinea);
        });
        console.log(data);
    }).catch((error) => {
        console.error("Error:", error);
        alert("Ocurrió un error al cargar los productos");
    });
