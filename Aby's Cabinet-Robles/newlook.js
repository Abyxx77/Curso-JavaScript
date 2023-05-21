
// Productos
const productos = [ 
    {
        id:'limpiador-roundLab',
        titulo:'ROUND LAB 1025 Dokdo Cleanser 150mL',
        imagen:'/Users/impacto/Documents/PreEntrega2-Robles/probando/imagenesnotnew/CleanserRoundLab.webp',
        categoria: {
            id:'limpiadores',
            nombre:'Limpiador'
        },
        precio:'$6500'
    },
    {
        id:'limpiador-cosrx',
        titulo:'COSRX Low Ph Good Mornig Gel Cleanser 150mL',
        imagen: '/Users/impacto/Documents/PreEntrega2-Robles/probando/imagenesnotnew/GelCleanserCOSRX.jpeg',
        categoria: { 
            id:'limpiadores',
            nombre:'Limpiador'
        },
        precio:'$5000'
    },
    {
        id:'limpiador-beautyOfjoseon',
        titulo:'BEAUTY OF JOSEON Ginseng Cleansing Oil 210mL',
        imagen: '/Users/impacto/Documents/PreEntrega2-Robles/probando/imagenesnotnew/GinsengCleansingOilBoJ.jpeg',
        categoria: {
            id:'limpiadores',
            nombre:'Limpiador'
        },
        precio:'$7000'
    },
    {
        id:'esencia-beautyOfjoseon',
        titulo:'BEAUTY OF JOSEON Ginseng Essence Water 150mL',
        imagen: '/Users/impacto/Documents/PreEntrega2-Robles/probando/imagenesnotnew/GinsegEssenceBoJ.jpeg',
        categoria: {
            id:'esencias',
            nombre:'Esencia'
        },
        precio:'$7500'
    },
    {
        id:'esencia-cosrx',
        titulo:'COSRX Advanced Snail 96 Mucin Power Essence 100mL',
        imagen: '/Users/impacto/Documents/PreEntrega2-Robles/probando/imagenesnotnew/SnailEssenceCOSRX.jpeg',
        categoria: {
            id:'esencias',
            nombre:'Esencia'
        },
        precio:'$7200'
    },
    {
        id:'hidratante-cosrx',
        titulo:'COSRX Advanced Snail 92 All In One Cream 100g',
        imagen: '/Users/impacto/Documents/PreEntrega2-Robles/probando/imagenesnotnew/CreamCOSRX.jpeg',
        categoria: {
            id:'hidratantes',
            nombre:'Hidratante'
        },
        precio:'$8000'
    },
    {
        id:'protectorSolar-beautyOfjoseon',
        titulo:'BEAUTY OF JOSEON Relief Sun: Rice + Probiotics 50mL',
        imagen: '/Users/impacto/Documents/PreEntrega2-Robles/probando/imagenesnotnew/sunscreenBeautyOfJoseon.webp',
        categoria: {
            id:'protectoresSolares',
            nombre:'Protector Solar'
        },
        precio:'$6500'
    },
    {
        id:'protectorSolar-abib',
        titulo:'ABIB Quick Sunstick Protection Bar 22g',
        imagen: '/Users/impacto/Documents/PreEntrega2-Robles/probando/imagenesnotnew/SunstickAbib.webp',
        categoria: {
            id:'protectoresSolares',
            nombre:'Protector Solar'
        },
        precio:'$7500'
    },
    {
        id:'protectorSolar-isntree',
        titulo:'ISNTREE Hyaluronic Acid Watery Sun Gel 50mL',
        imagen: '/Users/impacto/Documents/PreEntrega2-Robles/probando/imagenesnotnew/SunstickIsntree.jpeg',
        categoria: {
            id:'protectoresSolares',
            nombre:'Protector Solar'
        },
        precio:'$8200'
    }
];

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
// primero que aparezcan todos los productos
cargaProductos(productos); 

//mostrar productos
botonesCategoria.forEach(boton => {
    boton.addEventListener('click', (event) => {

        botonesCategoria.forEach(boton => boton.classList.remove('active'));
        event.currentTarget.classList.add('active');

        if (event.currentTarget.id != 'todos') { 
            const categoriaElegida = productos.find(producto => producto.categoria.id === event.currentTarget.id);
            console.log(categoriaElegida);
            tituloPrincipal.innerText = categoriaElegida.categoria.nombre;

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