function miFuncion() {
    let text;

let cuestionario = prompt("Bienvenido/a! Estas inetresado/a en los productos coreanos?");
switch(cuestionario) {
  case "si":
    text = "Estupendo, muy pronto estara habilitado el carrito de compras, por ahora, te invito a mirar algunos de los productos que van a estar disponibles.";
    break;
  case "no":
    text = "Que pena! El skincare coreano es reconocido mundialmente como altamente efectivo y accesible";
    break;
  case "no se":
    text = "Estas en el mejor lugar, te invito a enamorarte de estos increibles productos que muy pronto estaran dispobles para ordenar";
    break;
  default:
    text = "...?";
}

document.getElementById("demo").innerHTML = text;

}

//*************************************************************************** */
 
class listaProductos {
    constructor(nombre, marca, categoria, precio) {
        this.nombre = nombre;
        this.marca = marca;
        this.categoria = categoria;
        this.precio = precio;
    }
}

const producto1 = new listaProductos(
    'Low pH Good Morning Gel Cleanser', 
    'COSRX',
    'Limpiador facial',
    5000
);

const producto2 = new listaProductos(
    'Dokdo Cleanser',
    'Round Lab',
    'Limpiador facial',
    6500
);

const producto3 = new listaProductos(
    'Ginseng Cleansing Oil',
    'Beauty of Joseon', 
    'Limpiador facial',
    7000
);

const producto4 = new listaProductos(
    'Ginseng Essence Water',
    'Beauty of Joseon', 
    'Esencia',
    7500
);

const producto5 = new listaProductos(
    'Advanced Snail 96 Mucin Power Essence',
    'COSRX',
    'Esencia',
    7200
);

const producto6 = new listaProductos(
    'Advanced Snail 92 All In One Cream',
    'COSRX',
    'Crema Hidratante',
    8000
);

const producto7 = new listaProductos(
    'Relief Sun : Rice + Probiotic SPF50+ PA++++',
    'Beauty of Joseon',
    'Protector Solar',
    6500
);

const producto8 = new listaProductos(
    'Quick Sunstick Protection Bar SPF50+ PA++++',
    'Abib',
    'Protector Solar',
    7500
);

const producto9 = new listaProductos(
    'Hyaluronic Acid Airy Sunstick SPF50+ PA++++',
    'Isntree',
    'Protector Solar',
    8200
);


const productos = ['Low pH Good Morning Gel Cleanser', 'Dokdo Cleanser', 'Ginseng Cleansing Oil', 'Ginseng Essence Water', 
'Advanced Snail 96 Mucin Power Essence',  'Advanced Snail 92 All In One Cream',  'Advanced Snail 92 All In One Cream',
'Relief Sun : Rice + Probiotic SPF50+ PA++++', 'Quick Sunstick Protection Bar SPF50+ PA++++', 'Hyaluronic Acid Airy Sunstick SPF50+ PA++++'];


const limpiadores = productos.slice(0,3);
const mostrarLimpiadores = console.log('Limpiadores disponibles: ' + limpiadores);


const esencias = productos.slice(3,5);
const mostrarEsencias = console.log('Esencias disponibles: ' + esencias);


const hidratantes = productos.slice(5,6);
const mostrarHidratantes = console.log('Hidratantes disponibles ;' + hidratantes);


const solares = productos.slice(7,10);
const mostrarSolares = console.log('Protectores solares disponibles: ' + solares);
