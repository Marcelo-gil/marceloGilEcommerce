const alicuota = 21;
let nombreProducto = ""
let skuProducto = 0

const productos =[
    {nombre: 'ALF. MILKA TRIPLE OREO', sku: 1,precio: 170.15,stock: 50}, 
    {nombre: 'ALF. MILKA TRIPLE DULCE LECHE', sku: 2,precio: 150,stock: 25},
    {nombre: 'BARRA CEREAL FORT FRUTILLA', sku: 3,precio: 60,stock: 75}, 
    {nombre: 'BARRA COFLER EXTRA MARROC', sku: 4,precio: 125,stock: 40}, 
    {nombre: 'BOMBON BON O BON X 18 UNID.', sku: 5,precio: 480,stock: 20},
    {nombre: 'CARAM. BUTTER TOFFEE X 825 GRS', sku: 6,precio: 990,stock: 70}, 
    {nombre: 'CHICLE BELDENT INFINIT X UNID.', sku: 7,precio: 200,stock: 80},
    {nombre: 'CHOC. BIZNIKKE NEVADO X 25 GRS', sku: 8,precio: 95,stock: 10}
];

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

function agregaProducto(producto) {
    productos.push(producto);
}

function EliminaProducto(idProducto) {
    const indexBusqueda = productos.findIndex(producto => producto.sku === idProducto);    
    console.log(indexBusqueda);
    if(indexBusqueda!= -1) {
        productos.splice(indexBusqueda, 1);
    }
}
function stockDisponible() {
    let totalStock = 0;
    for (const producto of productos) {
        totalStock += producto.stock;
    }
    return totalStock;
}
function OrdenarPrecio() {
    const productosOrdenados = productos.map((producto) => producto);
    return productosOrdenados.sort((a,b) => a.precio - b.precio);
}
function PrecioMenor(idmenorPrecio) {
    const productosMenorPrecio = productos.filter(producto => producto.precio <= idmenorPrecio);
    return productosMenorPrecio.sort((a,b) => a.precio - b.precio);
}
function buscarProducto(idnombre) {    
    const productosBuscados = productos.find(producto => producto.nombre.includes(idnombre));
    console.log(productosBuscados);
    return productosBuscados;
}

while (nombreProducto!="ESC" && nombreProducto!="esc"){
    nombreProducto = prompt("Ingrese nombre del Producto                ESC-Termina ").toUpperCase();
    if (nombreProducto=="ESC") {
        break;
    }
    
    skuProducto = parseInt(prompt("Ingrese sku del Producto: "));
    let precioProducto = parseFloat(prompt("Ingrese precio de Producto: "));
    let stockProducto = parseFloat(prompt("Stock a Publicar: "));
  
    agregaProducto({nombre: nombreProducto,sku: skuProducto,precio: precioProducto,stock: stockProducto});

    console.log(productos.lenght);
    console.log(productos);
    
}

while (skuProducto!="ESC" && skuProducto!="esc"){
    skuProducto = (prompt("Ingrese sku del Producto a Borrar                 ESC-Termina "));
    if (skuProducto=="ESC" || skuProducto=="esc") {
        break;
    }
    let nskuProducto = parseInt(skuProducto)

    EliminaProducto(nskuProducto);
    console.log(productos.lenght);
    console.log(productos);
}

alert("Stock Disponible: "+stockDisponible());

console.log(OrdenarPrecio());

let menorPrecio = prompt("Buscar articulos con  Precio menor a:");
console.log(PrecioMenor(menorPrecio));

let Nombrebuscar = prompt("Descripción de articulo a Buscar:").toUpperCase();
console.log(Nombrebuscar);
console.log(buscarProducto(Nombrebuscar.trim()));
