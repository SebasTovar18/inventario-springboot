const API_URL = "http://localhost:8080/productos";

listarProductos();

function listarProductos() {

    axios.get(API_URL)
        .then(response => {

            const productos = response.data;

            let filas = "";

            productos.forEach(producto => {

                filas += `
                    <tr>
                        <td>${producto.id}</td>
                        <td>${producto.nombre}</td>
                        <td>${producto.precio}</td>
                        <td>${producto.stock}</td>
                        <td>${producto.categoria}</td>

                        <td class="acciones">

                            <button class="btn-editar"
                                onclick="editarProducto(
                                    ${producto.id},
                                    '${producto.nombre}',
                                    ${producto.precio},
                                    ${producto.stock},
                                    '${producto.categoria}'
                                )">
                                Editar
                            </button>

                            <button class="btn-eliminar"
                                onclick="eliminarProducto(${producto.id})">
                                Eliminar
                            </button>

                        </td>
                    </tr>
                `;
            });

            document.getElementById("tabla-productos").innerHTML = filas;

        })
        .catch(error => {
            console.log(error);
        });

}

function guardarProducto() {

    const id = document.getElementById("id").value;

    const producto = {

        nombre: document.getElementById("nombre").value,
        precio: document.getElementById("precio").value,
        stock: document.getElementById("stock").value,
        categoria: document.getElementById("categoria").value
    };

    if (id == "") {

        axios.post(API_URL, producto)
            .then(() => {
                limpiarFormulario();
                listarProductos();
            });

    } else {

        axios.put(`${API_URL}/${id}`, producto)
            .then(() => {
                limpiarFormulario();
                listarProductos();
            });

    }

}

function eliminarProducto(id) {

    axios.delete(`${API_URL}/${id}`)
        .then(() => {
            listarProductos();
        });

}

function editarProducto(id, nombre, precio, stock, categoria) {

    document.getElementById("id").value = id;
    document.getElementById("nombre").value = nombre;
    document.getElementById("precio").value = precio;
    document.getElementById("stock").value = stock;
    document.getElementById("categoria").value = categoria;

}

function limpiarFormulario() {

    document.getElementById("id").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("stock").value = "";
    document.getElementById("categoria").value = "";

}