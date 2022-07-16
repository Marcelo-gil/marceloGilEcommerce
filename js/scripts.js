const alicuota = 21;
const productos = {
    "1": {nombre: 'ALF. MILKA TRIPLE OREO', sku: 1,precio: 170.15}, 
    "2": {nombre: 'ALF. MILKA TRIPLE DULCE LECHE', sku: 2,precio: 150},
    "3": {nombre: 'BARRA CEREAL FORT FRUTILLA', sku: 3,precio: 60}, 
    "4": {nombre: 'BARRA COFLER EXTRA MARROC', sku: 4,precio: 125}, 
    "5": {nombre: 'BOMBON BON O BON X 18 UNID.', sku: 5,precio: 480},
    "6": {nombre: 'CARAM. BUTTER TOFFEE X 825 GRS', sku: 6,precio: 990}, 
    "7": {nombre: 'CHICLE BELDENT INFINIT X UNID.', sku: 7,precio: 200},
    "8": {nombre: 'CHOC. BIZNIKKE NEVADO X 25 GRS', sku: 8,precio: 95}
};

const carrito = {}

function sumarProducto(idArt){
    console.log(carrito);
    if (idArt in carrito){
        carrito[idArt].cantidad = carrito[idArt].cantidad + 1;
        carrito[idArt].total = productos[idArt].precio*carrito[idArt].cantidad;
    }else {
        carrito[idArt] = {sku: productos[idArt].sku, cantidad: 1,total:productos[idArt].precio};
    }
    let [totalCarrito, cantidadTotal] = calculaTotal();
    // carrito.push({sku: sku, cantidad: 1})
    ActualizarTotalCarrito(totalCarrito, cantidadTotal);
    console.log(cantidadTotal);
    console.log(totalCarrito);
}
function calculaTotal(){
    let total = 0,cantidadTotal = 0;

    for (const sku in carrito) {
        total += carrito[sku].total;
        cantidadTotal += carrito[sku].cantidad;
    }
    return [total,cantidadTotal];
}
function ActualizarTotalCarrito(totalCarrito,cantidadTotal){
    document.getElementById('idContadorCarrito').innerHTML=cantidadTotal;    
    document.getElementById('idTotalCarrito').innerHTML="Total: "+totalCarrito.toFixed(2)+" $";
    let subTotalCarrito=totalCarrito/(1+alicuota/100);
    let ivaCarrito=subTotalCarrito*(alicuota/100);
    document.getElementById('idIvaCarrito').innerHTML="Iva: "+ivaCarrito.toFixed(2)+" $";
    document.getElementById('idSubTotalCarrito').innerHTML="Iva: "+subTotalCarrito.toFixed(2)+" $";
}

