
let productosDelCarrito = localStorage.getItem('productos-del-carrito');
//console.log(productosDelCarrito);
productosDelCarrito = JSON.parse(productosDelCarrito);

//Llamo desde el HTML
const contenedorCarritoVacio = document.querySelector('#carrito-vacio');
const contenedorCarritoProductos = document.querySelector('#carrito-productos');
const contenedorCarritoAcciones = document.querySelector('#carrito-acciones');
const contenedorCarritoComprado = document.querySelector('#carrito-comprado');
let botonesEliminar = document.querySelectorAll('.carrito-producto-eliminar');
const botonVaciar = document.querySelector('#carrito-acciones-vaciar');
const contenedorTotal = document.querySelector('#total');
const botonComprar = document.querySelector('#carrito-acciones-comprar');

function cargarProductosCarrito() {
    if (productosDelCarrito /* && productosDelCarrito.lenght > 0*/) {

        contenedorCarritoVacio.classList.add('disabled');
        contenedorCarritoProductos.classList.remove('disabled');
        contenedorCarritoAcciones.classList.remove('disabled');
        contenedorCarritoComprado.classList.add('disabled');
    
        //que este vacio siempre de entrada
        contenedorCarritoProductos.innerHTML = '';
    
        productosDelCarrito.forEach(producto => {
            const div = document.createElement('div');
            div.classList.add('carrito-producto');
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Titulo</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <h3>${producto.cantidad}</h3>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <h3>${producto.precio}</h3>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <h3>${producto.precio * producto.cantidad}</h3>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><ion-icon name="trash"></ion-icon></button>
            `;
    
            contenedorCarritoProductos.append(div);
        })
        
    } else { 
        contenedorCarritoVacio.classList.remove('disabled');
        contenedorCarritoProductos.classList.add('disabled');
        contenedorCarritoAcciones.classList.add('disabled');
        contenedorCarritoComprado.classList.add('disabled');
    
    }

    actualizarBotonesEliminar ();
    actualizarTotal();
}

cargarProductosCarrito(); 

function actualizarBotonesEliminar () {
    botonesEliminar = document.querySelectorAll('.carrito-producto-eliminar');

    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', eliminarDelCarrito)
    })
};

function eliminarDelCarrito(event) {
    const idBoton = event.currentTarget.id;
    //console.log(idBoton);
    const index = productosDelCarrito.findIndex(producto => producto.id === idBoton);
    
    productosDelCarrito.splice(index, 1);
    cargarProductosCarrito(); 

    localStorage.setItem('productos-del-carrito', JSON.stringify(productosDelCarrito))
};

botonVaciar.addEventListener('click', vaciarCarrito);
function vaciarCarrito() {

    productosDelCarrito.lenght = 0;
    localStorage.setItem('productos-del-carrito', JSON.stringify(productosDelCarrito));
    
    cargarProductosCarrito(); 
};

function actualizarTotal () {
    const totalCalculado = productosDelCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    actualizarTotal.innerText = `$${totalCalculado}`;
}

//comprar
botonComprar.addEventListener('click', comprarCarrito);
function comprarCarrito() {

    productosDelCarrito.lenght = 0;
    localStorage.setItem('productos-del-carrito', JSON.stringify(productosDelCarrito));

    contenedorCarritoVacio.classList.add('disabled');
    contenedorCarritoProductos.classList.add('disabled');
    contenedorCarritoAcciones.classList.add('disabled');
    contenedorCarritoComprado.classList.remove('disabled');
};

