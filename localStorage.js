// Metodos  
// SetItem () = guarda coleccion de datos
// GetItem () = Extrae coleccion de datos
// removeItem() = elimina una coleccion guardada
// clearInterval()=Elimina todas las colecciones
// keys () = verifica si existe una coleccion 
// lenght = Indica el total de colecciones guardadas

// utilidad
// Json = parce()
// Json = Stringify()

// localStorage.getItem("prodcuto");
// null
// localStorage.getItem("producto");
// 'Arroz'
// let producto = localStorage.getItem("producto");
// undefined
// document.write("el producto guardado es:"+producto)
// undefined
// localStorage.removeItem("cuenta");
// undefined
// localStorage.length

// variables globales

const d = document;
let nombrePro = d.querySelector("#nombrePro");
let precioPro = d.querySelector("#precioPro");
let descripcionPro = d.querySelector("#descripcionPro");
let imagenPro = d.querySelector("#imagenPro");
let btnGuardar = d.querySelector(".btnGuardar")
let tabla = d.querySelector(".table tbody");

//agregar evento click al boton
btnGuardar.addEventListener("click", ()=>{
    //alert (nombrePro.value )
    validarDatos();
    borrarTabla();
    mostarDatos();
})

//funcion para validar datos del formulario
function validarDatos(){
    if( nombrePro.value && precioPro.value && descripcionPro.value && imagenPro.value)
    {
        //alert("todos los campos ok 👍");
        // se crea un objeto para guardar los datos
        producto = {
            nombre : nombrePro.value,
            precio : precioPro.value,
            descripcion : descripcionPro.value,
            imagen : imagenPro.value
        }
        console.log(producto);
        guardarDatos(producto);
    } else {
        alert("☢️Todos los campos son obligatoirios☢️")
    }
    // para borrar el formulario despues de guardarlos
    nombrePro.value ="";
    precioPro.value="";
    descripcionPro.value="";
    imagenPro.value = "";

    
}

//funcion para guardar datos en localStorage
function guardarDatos (pro){
    //JSON.PARCE guarda la informacion en un array en este caso producto queda en array
    //validar datos previamente guardados en localStorage
    let producto = JSON.parse(localStorage.getItem("productos")) || [];
    // agregar un nuveo dato al array
    producto.push(pro);
    // guardar los datos en localStorage
    localStorage.setItem("productos", JSON.stringify(producto));
    alert("El producto fue guardado con exito 👍");

}

// funcion para extraer los datos guardados en el Localstorage
function mostarDatos(){
    let producto = [];
    // extraer datos guardados previamente en el localStorage

    let productosPrevios = JSON.parse(localStorage.getItem("productos"));

    //validar datos guardados previamente en el localStorage
    if (productosPrevios != null) {
        producto = productosPrevios;
    }
    //mostrar los datos en la tabla
    producto.forEach((p,i)=>{
        let fila =d.createElement("tr");
        fila.innerHTML = `
            <td> ${i+1} </td>
            <td> ${p.nombre} </td>
            <td> ${p.precio} </td>
            <td> ${p.descripcion} </td>
            <td> ${p.imagen} </td>
            <td>
                <span onclick="actualizarProducto(${i})" class="btn-editar btn btn-warning"> 🗒️ </span>
                <span onclick="eliminarProducto(${i})" class="btn-eliminar btn btn-danger"> ✖️ </span>
            </td>
        `;
        // imagen ..... <td> <img src= "${p.imagen}" width="30%" </td>
        tabla.appendChild(fila)
    });
}

//quitar los datos de la tabla
function borrarTabla(){
    let filas = d.querySelectorAll(".table tbody tr");
    filas.forEach((f)=>{
        f.remove();
    }

    )
}

//funcion eliminar un dato de la tabla
function eliminarProducto (pos){
    let producto = [];
    // extraer datos guardados previamente en el localStorage
    let productosPrevios = JSON.parse(localStorage.getItem("productos"));
    //validar datos guardados previamente en el localStorage
    if (productosPrevios != null) {
        producto = productosPrevios;
    }
    //confirmar producto a eliminar
    let confirmar = confirm("¿Desea Eliminar este producto ?");
    if (confirmar){
       // alert("lo eliminaste");
       let p = producto.splice(pos,1);
       alert("El producto selecionado fue eliminado con exito");
       // guardar los datos que quedaron en el localStorage
       localStorage.setItem("productos", JSON.stringify(producto));
       borrarTabla();
       mostarDatos();

    }
}

//actualizar pedido
function actualizarProducto(pos){
    let producto = [];
    // extraer datos guardados previamente en el localStorage
    let productosPrevios = JSON.parse(localStorage.getItem("productos"));
    //validar datos guardados previamente en el localStorage
    if (productosPrevios != null) {
        producto = productosPrevios;
    }
    //pasar los datos al formulario
    nombrePro.value = producto[pos].nombre;
    precioPro.value = producto[pos].precio;
    descripcionPro.value = producto[pos].descripcion;
    //activar el boton de actualizar
    let btnActualizar = d.querySelector(".btnActualizar");
    btnActualizar.classList.toggle("d-none");
    btnGuardar.classList.toggle("d-none");

    //agregar evento al boton actualizar
    btnActualizar.addEventListener("click", function(){
        producto[pos].nombre = nombrePro.value;
        producto[pos].precio = precioPro.value;
        producto[pos].descripcion = descripcionPro.value;

    //guardar los datos editados en localstorage
        localStorage.setItem("productos", JSON.stringify(producto));
        alert("El dato fue actualizado con exito");
        borrarTabla();
        mostarDatos();

        nombrePro.value ="";
        precioPro.value="";
        descripcionPro.value="";
    })

}

//mostrar los datos de localStorage al recargar la pagina
d.addEventListener("DOMcontentLoaded", function(){
    borrarTabla();
    mostarDatos();
})


let buscarPor = document.getElementById("buscarPor")
let valorSelect = buscarPor.value

buscarPor.addEventListener("change", () => {
    valorSelect = buscarPor.value

})


inputBuscador.addEventListener("input", () => {

    let inputBuscadorValue = inputBuscador.value.toLowerCase()
    let productos = JSON.parse(localStorage.getItem("productos")) || []
    let productosBuscados

    if (valorSelect === "nombre") {
        productosBuscados = productos.filter(producto => producto.nombre.toLowerCase().includes(inputBuscadorValue))
    }
    else if (valorSelect === "precio") {
        productosBuscados = productos.filter(producto => producto.precio.toLowerCase().includes(inputBuscadorValue))
    }
    else if (valorSelect === "descripcion") {
        productosBuscados = productos.filter(producto => producto.descripcion.toLowerCase().includes(inputBuscadorValue))
    }

    let datos = document.querySelectorAll("table tbody tr")
    datos.forEach((dato) => {
        dato.remove()
    })

    productosBuscados.forEach((dato, i) => {
        let fila = document.createElement("tr")
        fila.innerHTML =
            `<td class="align-middle">${i + 1}</td>
            <td class="align-middle">${dato.nombre}</td>
            <td class="align-middle">${dato.precio}</td>
            <td class="align-middle">${dato.descripcion}</td>
            <td class="align-middle"><img src="${dato.imagen}" width="30%"> </td>   
            <td class="align-middle">
                 <button onclick="actualizarDatos(${i})" class="btn btn-primary btnEditar">📝</button>     
                 <button onclick="eliminarDatos(${i})" class="btn btn-danger btnEliminar">❌</button>
            </td> `
        tabla.appendChild(fila)
    });
})
