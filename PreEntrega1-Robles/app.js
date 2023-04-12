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

