const alicuota = 21;
let nombreProducto = ""
let skuProducto = 0
let idArtnew=0

const productos =[
    {nombre: 'ALF. MILKA TRIPLE OREO', sku: 1,precio: 170.15,stock: 50,oferta: false,imagenArt: "./imagenes/alf3Oreo.webp"}, 
    {nombre: 'ALF. MILKA TRIPLE DULCE LECHE', sku: 2,precio: 150,stock: 25,oferta: true,imagenArt: "./imagenes/alf3DLeche.jpg"},
    {nombre: 'BARRA CEREAL FORT FRUTILLA', sku: 3,precio: 60,stock: 75,oferta: true,imagenArt: "./imagenes/cerealFortFrutilla.jpg"}, 
    {nombre: 'BARRA COFLER EXTRA MARROC', sku: 4,precio: 125,stock: 40,oferta: false,imagenArt: "./imagenes/CoflerExtraMarroc.jpg"}, 
    {nombre: 'BOMBON BON O BON X 18 UNID.', sku: 5,precio: 480,stock: 20,oferta: true,imagenArt: "./imagenes/bonobon18ud.jpg"},
    {nombre: 'CARAM. BUTTER TOFFEE X 825 GRS', sku: 6,precio: 990,stock: 70,oferta: false,imagenArt: "./imagenes/butterToffees.webp"}, 
    {nombre: 'CHICLE BELDENT INFINIT X UNID.', sku: 7,precio: 200,stock: 80,oferta: true,imagenArt: "./imagenes/BeldemtInfinit.jpg"},
    {nombre: 'CHOC. BIZNIKKE NEVADO X 25 GRS', sku: 8,precio: 95,stock: 10,oferta: false,imagenArt: "./imagenes/biznikkeNevado.jpg"},
    {nombre: 'ALF. GUAYMALLEN TRIPLE X 24 UNID. FRUTA', sku: 9,precio: 580,stock: 28,oferta: true,imagenArt: "./imagenes/alf3guaymallen.jpg"}, 
    {nombre: 'PAST. MENTHOPLUS S/AZUCAR X 12 DURAZNO', sku: 10,precio: 506,stock: 14,oferta: true,imagenArt: "./imagenes/menthoplus.jpg"},
    {nombre: 'TIC TAC MENTA FUERTE', sku: 11,precio: 120,stock: 4,oferta: false,imagenArt: "./imagenes/ticTacMentaFuerte.jpg"} 
];

/* Obtengo carrito del storage o creo uno vacio */
const carrito = JSON.parse(localStorage.getItem("carrito")) ?? {};

const ofertaArray = [];

function buscaOferta(idArt){
    const productosBuscados = productos.find(producto => producto.sku===idArt);
    return productosBuscados.oferta;
}

function eliminaOferta(idOferta){
    let ofertaAdd = ""
    for (const producto of productos) {
        ofertaAdd ="oferta"+(producto+1);
        ofertaArray.push(0);
    }
    const elemento = document.getElementById(ofertaArray[idOferta].textContent="");
}

function limpiarProductoshtml(){
    let nuevos = document.querySelector("#ProductosNuevos");
    nuevos.innerHTML = "";
}

function agregaProductohtml(idArt, nombreProducto, precioProducto, ofertaProducto,imagenArt){
    let nuevos = document.querySelector("#ProductosNuevos");

    const fragment = document.createDocumentFragment();

    const divOferta = document.createElement('div');
    divOferta.className ="col mb-5"
    fragment.appendChild(divOferta);
    
    const divOferta0 = document.createElement('div');
    divOferta0.className = "card h-100";
    divOferta.appendChild(divOferta0);
    
    const divOferta1 = document.createElement('div');
    divOferta1.id="oferta"+idArt;
    divOferta1.className = "badge bg-dark text-dark position-absolute" ;
    divOferta1.style="top: 0.5rem; right: 0.5rem"
    if (ofertaProducto){
        divOferta1.textContent ="Oferta";
    } else {
        divOferta1.textContent ="";
    }
    divOferta0.appendChild(divOferta1);
    
    const imagenArticulo = document.createElement('img');
    imagenArticulo.className = "card-img-top";
    imagenArticulo.src = imagenArt
    imagenArticulo.alt = "Imagen de Articulo";
    divOferta0.appendChild(imagenArticulo);
        
    const articuloNombre = document.createElement('div');
    articuloNombre.className = "card-body p-4";
    divOferta0.appendChild(articuloNombre);

    const articuloNombre1 = document.createElement('div');
    articuloNombre1.className = "text-center";
    articuloNombre.appendChild(articuloNombre1);

    const articuloNombre2 = document.createElement('h5');
    articuloNombre2.className = "fw-bolder";
    articuloNombre2.textContent = nombreProducto;
    articuloNombre.appendChild(articuloNombre2);

    const divEstrellas = document.createElement('div');
    divEstrellas.className = "d-flex justify-content-center small text-warning mb-2"
    divOferta0.appendChild(divEstrellas);

    const estrellas = document.createElement('div');
    estrellas.className = "bi-star-fill";
    divEstrellas.appendChild(estrellas);
    const estrellas2 = document.createElement('div');
    estrellas2.className = "bi-star-fill";
    divEstrellas.appendChild(estrellas2);
    const estrellas3 = document.createElement('div');
    estrellas3.className = "bi-star-fill";
    divEstrellas.appendChild(estrellas3);
    const estrellas4 = document.createElement('div');
    estrellas4.className = "bi-star-fill";
    divEstrellas.appendChild(estrellas4);
    const estrellas5 = document.createElement('div');
    estrellas5.className = "bi-star-fill";
    divEstrellas.appendChild(estrellas5);
    const articuloPrecio = document.createElement('p');
    articuloPrecio.className ="text-center";
    articuloPrecio.textContent = "$"+precioProducto;
    articuloNombre.appendChild(articuloPrecio);
    
    /* botones y contador */
    const articuloAccion = document.createElement('div');
    articuloNombre.className = "card-footer p-4 pt-0 border-top-0 bg-transparent";
    divOferta0.appendChild(articuloAccion);

    const articuloAccion1 = document.createElement('div');
    articuloAccion1.className = "text-center";
    articuloAccion.appendChild(articuloAccion1);
    /* boton + */
    const articuloAbtn = document.createElement('a');
    articuloAbtn.id = "idsumaProducto"+idArt;
    articuloAbtn.className = "btn  mt-auto";
    articuloAbtn.onclick = () => sumarProducto(idArt); 
    articuloAccion1.appendChild(articuloAbtn);
        
    const articuloAbtnimg = document.createElement('img');
        articuloAbtnimg.src = "/imagenes/sumar.png";
    articuloAbtn.appendChild(articuloAbtnimg);
    
    /* contador */
    const articuloContador = document.createElement('span');
    articuloContador.id = "idContadorProducto"+idArt;
    articuloContador.className="badge  bg-dark2 text-dark ms-1";
    articuloContador.textContent = 0;
    articuloAccion1.appendChild(articuloContador);

    /* boton - */
    const articuloAbtnResta = document.createElement('a');
    articuloAbtnResta.id = "idRestaProducto"+idArt;
    articuloAbtnResta.className = "btn  mt-auto";
    articuloAbtnResta.onclick = () =>  restarProducto(idArt);
    articuloAccion1.appendChild(articuloAbtnResta);
    
    const articuloAbtnimgResta = document.createElement('img');
    articuloAbtnimgResta.src = "/imagenes/restar.png";
    articuloAbtnResta.appendChild(articuloAbtnimgResta);
    /* inserto en el html */
    fragment.appendChild(divOferta);
    nuevos.appendChild(fragment);    
}
function sumarProducto(idArt){
    const miProducto=buscarProductoSku(idArt);
    if (idArt in carrito){
        carrito[idArt].cantidad = carrito[idArt].cantidad + 1;
        carrito[idArt].total = miProducto.precio*carrito[idArt].cantidad;
    }else {
        carrito[idArt] = {sku: miProducto.sku,nombre: miProducto.nombre, cantidad: 1,total:miProducto.precio};
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    let [totalCarrito, cantidadTotal] = calculaTotal();
    actualizarTotalCarritoHtml(totalCarrito, cantidadTotal);
}
function restarProducto(idArt){
    const miProducto=buscarProductoSku(idArt);
    if (idArt in carrito){
        if (carrito[idArt].cantidad != 0){
            carrito[idArt].cantidad = carrito[idArt].cantidad - 1;
            carrito[idArt].total = miProducto.precio*carrito[idArt].cantidad;
        }
        let [totalCarrito, cantidadTotal] = calculaTotal();
        actualizarTotalCarritoHtml(totalCarrito, cantidadTotal);
        if (carrito[idArt].cantidad === 0){
            delete carrito[idArt];
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
}
function calculaTotal(){
    let total = 0,cantidadTotal = 0;
    for (const sku in carrito) {
        total += carrito[sku].total;
        cantidadTotal += carrito[sku].cantidad;
        let idcoprod= "idContadorProducto"+sku
        if (document.getElementById(idcoprod)!=undefined){
            document.getElementById(idcoprod).innerHTML=carrito[sku].cantidad;
        }
    }

    return [total,cantidadTotal]; 
}
function actualizarTotalCarritoHtml(totalCarrito,cantidadTotal){ 
    document.getElementById('idContadorCarrito').innerHTML=cantidadTotal;    
    document.getElementById('idTotalCarrito').innerHTML="Total: "+totalCarrito.toFixed(2)+" $";
    let subTotalCarrito=totalCarrito/(1+alicuota/100);
    let ivaCarrito=subTotalCarrito*(alicuota/100);
    document.getElementById('idIvaCarrito').innerHTML="Iva: "+ivaCarrito.toFixed(2)+" $";
    document.getElementById('idSubTotalCarrito').innerHTML="Subtotal: "+subTotalCarrito.toFixed(2)+" $";
}

function agregaProducto(producto) {
    productos.push(producto);
}

function EliminaProducto(idProducto) {
    const indexBusqueda = productos.findIndex(producto => producto.sku === idProducto);    
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
    return productosBuscados;
}
function buscarProductos(idnombre) {    
    const productosBuscados = productos.filter(producto => producto.nombre.includes(idnombre));
    return productosBuscados;
}
function buscarProductoSku(idSku) {    
    const productosBuscados = productos.find(producto => producto.sku===idSku);
    return productosBuscados;
}

function buscarOfertas() { 
    const productosBuscados = productos.filter(producto => producto.oferta);
    return productosBuscados;
}
function updateValue(e) {
    let letras=e.srcElement.value;
    letras=letras.toUpperCase();
    const resultado = buscarProductos(letras);
    limpiarProductoshtml()
    for (const producto of resultado) {
        agregaProductohtml(producto.sku, producto.nombre, producto.precio, producto.oferta,producto.imagenArt);
    }
    let [totalCarrito, cantidadTotal] = calculaTotal();
    actualizarTotalCarritoHtml(totalCarrito, cantidadTotal);
}
function updateOfertas() {
    const resultado = buscarOfertas();
    limpiarProductoshtml()
    for (const producto of resultado) {
        agregaProductohtml(producto.sku, producto.nombre, producto.precio, producto.oferta,producto.imagenArt);
    }
    let [totalCarrito, cantidadTotal] = calculaTotal();
    actualizarTotalCarritoHtml(totalCarrito, cantidadTotal);
}
function vaciarCarrito(){
    if (confirm("Vacias El Carrito?")){
        for (const sku in carrito) {
            carrito[sku].cantidad=0;
            carrito[sku].total=0;
        }
        let [totalCarrito, cantidadTotal] = calculaTotal();
        actualizarTotalCarritoHtml(totalCarrito, cantidadTotal);
        for (const sku in carrito) {
            delete carrito[sku];
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
}

/* =========== Fin funciones ========== */

/*  Armo el html con los productos */
for (const producto of productos) {
    agregaProductohtml(producto.sku, producto.nombre, producto.precio, producto.oferta,producto.imagenArt);
}
const haches5 = document.querySelectorAll("h5");
/*  */
for (let i = 0; i < (haches5.length); i++) {
    if (buscaOferta(i+1)){
        haches5[i].style.color = "red";
    } else{
        eliminaOferta(i);
    }
}
productos.forEach((producto) => {
    const idButtonResta ="idRestaProducto"+producto.sku;
    const botonResta=document.getElementById(idButtonResta);
    
    const idButtonSuma ="idsumaProducto"+producto.sku;
    const botonSuma=document.getElementById(idButtonSuma);
});
const imputId = document.getElementById("fname");
imputId.addEventListener('input',updateValue);

const todoProd=document.getElementById("todosProductos");
imputId.addEventListener('click',updateValue);

const promoProd=document.getElementById("promoProductos");
promoProd.addEventListener('click',updateOfertas);

const vaciarCarro=document.getElementById("btnVaciarCarrito");
vaciarCarro.addEventListener('click',vaciarCarrito);

/* Calculo Totales por si recupere el carrito del storage  */
let [totalCarrito, cantidadTotal] = calculaTotal();
actualizarTotalCarritoHtml(totalCarrito, cantidadTotal);
