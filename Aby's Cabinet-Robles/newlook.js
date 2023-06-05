
let productos = [];

fetch("./productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargaProductos(productos);
    })
    

// Llamo desde HTML
const contenedorProductos = document.querySelector('#contenedor-productos');
const botonesCategoria = document.querySelectorAll('.bt-categ');
const tituloPrincipal = document.querySelector('#titulo-principal');
let botonesAgregar = document.querySelectorAll('.producto-agregar');
const numero = document.querySelector('.numero');

//Que los productos aparezcan en la pag
function cargaProductos(categoriaElegida) {

    //1ro vacio el cont productos
    contenedorProductos.innerHTML = '';

    productos.forEach(producto => {
    
        const div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML = ` 
        <img class= "producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
         <div class="producto-detalles">
            <h3 class="producto-titulo">${producto.titulo}</h3>
            <p class="producto-precio">${producto.precio}</p>
            <button class="producto-agregar" id="${producto.id}">Comprar</button>
            </div>
            `;
        contenedorProductos.append(div);

    })

    actualizarBotonesAgregar();
    // console.log(botonesAgregar);
} 


//mostrar productos
botonesCategoria.forEach(boton => {
    boton.addEventListener('click', (event) => {

        botonesCategoria.forEach(boton => boton.classList.remove('active'));
        event.currentTarget.classList.add('active');

        if (event.currentTarget.id != 'todos') { 
            const categoriaElegida = productos.find(producto => producto.categoria.id === event.currentTarget.id);
            console.log(categoriaElegida);
            tituloPrincipal.innerText = categoriaElegida.categoria.nombre;
            cargaProductos(categoriaElegida);

            const categoriasBoton = productos.filter(producto => producto.categoria.id === event.currentTarget.id);
            cargaProductos(categoriasBoton); 
            console.log(categoriasBoton);
        } else {
            tituloPrincipal.innerText = 'Todos los productos';
            cargaProductos(productos);
        }

    })

});

// Agregando productos al carrito
function actualizarBotonesAgregar () {
    botonesAgregar = document.querySelectorAll('.producto-agregar');

    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito)
    })
}

// console.log(b b otonesAgregar);
let productosDelCarrito;
let productosDelCarritoLS = localStorage.getItem('productos-del-carrito');

if (productosDelCarritoLS) {
    productosDelCarrito = JSON.parse(productosDelCarritoLS);
    actualizarNumero();
} else {
    productosDelCarrito = [];
};

function agregarAlCarrito(event) {

    Toastify({
        text: "Producto Agregado",
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
    const productosAgregados = productos.find(producto => producto.id === idBoton);
    // console.log(productosAgregados);
    if(productosDelCarrito.some(producto => producto.id === idBoton)) {
        const index = productosDelCarrito.findIndex(producto => producto.id === idBoton);
        //console.log(index);
        productosDelCarrito[index].cantidad++;
    } else {
        productosAgregados.cantidad = 1;
        productosDelCarrito.push(productosAgregados);
    }
    //console.log(productosDelCarrito);
    actualizarNumero();

    localStorage.setItem('productos-del-carrito', JSON.stringify(productosDelCarrito));
}

function actualizarNumero() {
    let nuevoNumero = productosDelCarrito.reduce((acc, producto) => acc + producto.cantidad, 0); 
    numero.innerText = nuevoNumero;
}