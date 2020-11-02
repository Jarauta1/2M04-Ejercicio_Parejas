let almacenTodo = "";

function mostrarProductos(data, tipo) {

    for (let i = 0; i < data[tipo].length; i++) {
        almacenTodo += `
        <div class="producto">
        <img src="${data[tipo][i].img}" alt="${data[tipo][i].nombre}">
        <div class="info-producto">
        <h4>${data[tipo][i].nombre}</h4>
          <p>${data[tipo][i].descripccion}</p>
            <p>Precio: ${data[tipo][i].precio}</p>
            </div>
            </div>
        `
    }
}


fetch('/almacen').then(function(res) {
    return res.json();
}).then(function(data) {

    mostrarProductos(data, "armarios");
    mostrarProductos(data, "mesas");
    mostrarProductos(data, "sillas");

    document.getElementById('resultado').innerHTML = almacenTodo;
})

let seccion

function buscarProducto() {
    seccion = document.getElementById("productoBuscar").value
    fetch(`/almacen/${seccion}`)
        .then(response => response.json())
        .then(data => {

            let almacenSeccion = "";

            if (data.error == true) {
                document.getElementById("resultado").innerHTML = `
                <h2>${data.mensaje}</h2>
                `
            } else {

                for (let i = 0; i < data.length; i++) {

                    almacenSeccion += `
                        <div class="producto">
                            <img src="${data[i].img}" alt="${data[i].nombre}">
                            <div class="info-producto">
                                <h4>${data[i].nombre}</h4>
                                <p>${data[i].descripccion}</p>
                                <p>Precio: ${data[i].precio}</p>
                            </div>
                        </div>
                        `
                }
                document.getElementById('resultado').innerHTML = almacenSeccion;
            }
        });
}

function addProducto() {

    let seccion = document.getElementById("categorias").value
    let nombre = document.getElementById("nombreProducto").value
    let descripccion = document.getElementById("descripcionProducto").value
    let img = document.getElementById("fotoProducto").value
    let precio = parseInt(document.getElementById("precioProducto").value)

    let add = { seccion: seccion, nombre: nombre, descripccion: descripccion, img: img, precio: precio }

    fetch("/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(add),
        })
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            almacenTodo = ""
            document.getElementById("nombreProducto").value = ""
            document.getElementById("precioProducto").value = ""
            document.getElementById("fotoProducto").value = ""
            document.getElementById("descripcionProducto").value = ""
            mostrarProductos(data, "armarios");
            mostrarProductos(data, "mesas");
            mostrarProductos(data, "sillas");

            document.getElementById('resultado').innerHTML = almacenTodo;

        });
}