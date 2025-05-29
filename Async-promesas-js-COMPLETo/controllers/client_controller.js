import { clientService } from "../service/client-service.js";

// Función para crear cada fila de la tabla
const crear_nueva_fila = (nombre, email, id) => {
  const fila = document.createElement('tr');

  const contenido = `
    <td class="td" data-td>${nombre}</td>
    <td>${email}</td>
    <td>
      <ul class="table__button-control">
        <li>
          <a href="../screens/editar_cliente.html?id=${id}" class="simple-button simple-button--edit">Editar</a>
        </li>
        <li>
          <button class="simple-button simple-button--delete" type="button" data-id="${id}">
            Eliminar
          </button>
        </li>
      </ul>
    </td>
  `;

  fila.innerHTML = contenido;

  const btn = fila.querySelector("button");
  btn.addEventListener("click", async () => {
    const id = btn.dataset.id;
    try {
      await clientService.eliminarCliente(id);
      alert("Cliente eliminado correctamente");
      fila.remove(); 
    } catch (error) {
      alert("Error al eliminar");
      console.error(error);
    }
  });

  return fila;
};

const table = document.querySelector("[data-table]");
clientService.listaClientes()
  .then((data) => {
    data.forEach(({ nombre, email, id }) => {
      const nuevaLinea = crear_nueva_fila(nombre, email, id);
      table.appendChild(nuevaLinea);
    });
  })
  .catch((error) => {
    alert("Ocurrió un error al cargar los clientes");
    console.error(error);
  });

const inputBuscar = document.getElementById('buscador');
inputBuscar.addEventListener('input', () => {
  const valor = inputBuscar.value.toLowerCase();
  const filas = document.querySelectorAll("tbody tr");

  filas.forEach(fila => {
    const nombre = fila.querySelector("td").textContent.toLowerCase();
    fila.style.display = nombre.includes(valor) ? "" : "none";
  });
});





//---------------------------
/*
import { clientService } from "../service/client-service.js";

const crear_nueva_fila = (nombre, email, id) => {
    const fila = document.createElement('tr');
    const contenido = `
        <td class="td" data-td>${nombre}</td>
        <td>${email}</td>
        <td>
            <ul class="table__button-control">
                <li>
                    <a href="../screens/editar_cliente.html?id=${id}"
                       class="simple-button simple-button--edit">
                       Editar
                    </a>
                </li>
                <li>
                    <button class="simple-button simple-button--delete"
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
        if (confirm("¿Estás seguro de eliminar este cliente?")) {
            clientService.eliminarCliente(id)
                .then(() => {
                    fila.remove();
                    alert("Cliente eliminado correctamente");
                })
                .catch(error => {
                    console.error("Error:", error);
                    alert("Error al eliminar el cliente");
                });
        }
    });

    return fila;
};

const table = document.querySelector("[data-table]");

clientService.listaclientes()
    .then(data => {
        data.forEach(({nombre, email, id}) => {
            const nuevaLinea = crear_nueva_fila(nombre, email, id);
            table.appendChild(nuevaLinea);
        });
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Ocurrió un error al cargar los clientes");
    });
    */