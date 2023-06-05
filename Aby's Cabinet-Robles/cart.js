
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

    Toastify({
        text: "Producto Eliminado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #ff7777, #f5a4a4)",
          borderRadius: '2rem',
          fontSize: '.75rem'
        },
        offset:{
            x: '1.5rem',
            y: '1.5rem'
        },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBoton = event.currentTarget.id;
    //console.log(idBoton);
    const index = productosDelCarrito.findIndex(producto => producto.id === idBoton);
    
    productosDelCarrito.splice(index, 1);
    cargarProductosCarrito(); 

    localStorage.setItem('productos-del-carrito', JSON.stringify(productosDelCarrito))
};

botonVaciar.addEventListener('click', vaciarCarrito);
function vaciarCarrito() {

  Swal.fire({
    title: 'Estas seguro/a?',
    html: `${productosDelCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos seran borrados!`, 
    icon: '<ion-icon name="alert-circle-outline"></ion-icon>',
    width: 600,
    padding: '3em',
    color: '#716add',
    background: '#fff url(/images/trees.png)',
    backdrop: `
      rgba(0,0,123,0.4)
      url("/images/nyan-cat.gif")
      left top
      no-repeat
  `,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: 'Si',
    cancelButtonText: 'No',
  }) .then((result) => {
    if (result.isConfirmed) {

      productosDelCarrito.lenght = 0;
      localStorage.setItem('productos-del-carrito', JSON.stringify(productosDelCarrito));
      cargarProductosCarrito(); 

    } 
  })
    
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



Swal.fire({
  title: 'Estas seguro?',
  text: "Esta accion no se puede revertir!",
  icon: <ion-icon name="alert-circle-outline"></ion-icon>,
  width: 600,
  padding: '3em',
  color: '#716add',
  background: '#fff url(/images/trees.png)',
  backdrop: `
    rgba(0,0,123,0.4)
    url("/images/nyan-cat.gif")
    left top
    no-repeat
  `,
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire(
      'Deleted!',
      'Your file has been deleted.',
      'success'
    )
  }
})
