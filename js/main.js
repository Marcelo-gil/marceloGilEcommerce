const alicuota = 21;
let nombreProducto = ""
let skuProducto = 0
let idArtnew=0
let productos =[];
/* Funcion asincrona para traer productos del json */
const traerProductosEnJson = async () => {
    const response = await fetch('../json/productos.json');
    const informacion = await response.json();
    productos = informacion;
}

/* Obtengo carrito del storage o creo uno vacio */
const carrito = JSON.parse(localStorage.getItem("carrito")) ?? {};

const ofertaArray = [];

function buscaOferta(idArt){
    const productosBuscados = productos.find(producto => producto.sku===idArt);
    return productosBuscados.oferta;
}

function limpiarProductoshtml(){
    let nuevos = document.querySelector("#ProductosNuevos");
    nuevos.innerHTML = "";
}

function agregaProductohtml({sku: idArt,nombre: nombreProducto, precio: precioProducto, oferta: ofertaProducto, imagenArt}){
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
    divOferta1.textContent = (ofertaProducto) ? "Oferta" : "";
    divOferta0.appendChild(divOferta1);
    
    const imagenArticulo = document.createElement('img');
    imagenArticulo.className = "card-img-top imagenPequenia";
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
    articuloNombre2.style.color = (ofertaProducto) ? "red" : "black";
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
    articuloAbtnimg.src = "./imagenes/sumar.png";
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
    articuloAbtnimgResta.src = "./imagenes/restar.png";
    articuloAbtnResta.appendChild(articuloAbtnimgResta);
    /* inserto en el html */
    fragment.appendChild(divOferta);
    nuevos.appendChild(fragment);    
}
function sumarProducto(idArt){
    const miProducto=buscarProductoSku(idArt);
    if (idArt in carrito){
        carrito[idArt] = {
            ...carrito[idArt], 
            cantidad: carrito[idArt].cantidad + 1,
            total:  miProducto.precio*carrito[idArt].cantidad
        };
    }else {
        carrito[idArt] = {sku: miProducto.sku,nombre: miProducto.nombre, cantidad: 1,total: miProducto.precio,imagenArt: miProducto.imagenArt};
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    let [totalCarrito, cantidadTotal] = calculaTotal();
    actualizarTotalCarritoHtml(totalCarrito, cantidadTotal);
    toasti(miProducto.nombre,"#00b09b", "#96c93d");
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
        (carrito[idArt].cantidad === 0) && delete carrito[idArt];
        localStorage.setItem("carrito", JSON.stringify(carrito));
        toasti(miProducto.nombre,"#ff0000", "#96c93d");
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
    (indexBusqueda!= -1) && productos.splice(indexBusqueda, 1);
}
function stockDisponible() {
    let totalStock = 0;
    for (const producto of productos) {
        totalStock += producto.stock;
    }
    return totalStock;
}
function OrdenarPrecio() {
    //const productosOrdenados = productos.map((producto) => producto);
    const productosOrdenados = [...productos]
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
        agregaProductohtml(producto);
    }
    /* desestructuro return  */
    let [totalCarrito, cantidadTotal] = calculaTotal();
    actualizarTotalCarritoHtml(totalCarrito, cantidadTotal);
}
function updateOfertas() {
    const resultado = buscarOfertas();
    limpiarProductoshtml()
    for (const producto of resultado) {
        agregaProductohtml(producto);
    }
    let [totalCarrito, cantidadTotal] = calculaTotal();
    actualizarTotalCarritoHtml(totalCarrito, cantidadTotal);
}
function vaciarCarrito(){
    /* if (confirm("Vacias El Carrito?")){ */
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
    /* } */
}
function toasti(mensaje,color1,color2){
    Toastify({
        text: mensaje,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
        background: `linear-gradient(to right, ${color1}, ${color2})`,
        },
        duration: 3000
    }).showToast();
}    
function displaycarrito() {
    /* carrito.forEach((carrito) => */
    document.getElementById("finCarrito").innerHTML = ``
    for (const sku in carrito) {
        let tablaImg = `<td><img src="${carrito[sku].imagenArt}" class=".imagenPequenia" style="width:45px"></td>`;
        let tablaNombre = `<td>${carrito[sku].nombre}</td>`;
        let tablaCantidad = `<td  class="text-center"> ${carrito[sku].cantidad}</td>`;
        let tablaPrecio = `<td class="text-end">$ ${carrito[sku].total}</td>`;
        document.getElementById("finCarrito").innerHTML += `<tr>${tablaImg + tablaNombre + tablaCantidad + tablaPrecio}</tr}`;
    }
    let [totalCarrito, cantidadTotal] = calculaTotal()
    let tablaImg = `<td></td>`;
    let tablaNombre = `<td></td>`;
    let tablaCantidad = `<td class="text-center"></td>`;
    let tablaPrecio = `<td class="text-end"><b>Total $ ${totalCarrito}</b></td>`;
    document.getElementById("finCarrito").innerHTML += `<tr>${tablaImg + tablaNombre + tablaCantidad + tablaPrecio}</tr}`;
}
/* =========== Fin funciones ========== */
/* ejecuto la Funcion y cuando tengo la respuesta armo el carrito */
traerProductosEnJson().then( () => { 
    /*  Armo el html con los productos */
    for (const producto of productos) {
        agregaProductohtml(producto);
    }
    const imputId = document.getElementById("fname");
    imputId.addEventListener('input',updateValue);
    const todoProd=document.getElementById("todosProductos");
    imputId.addEventListener('click',updateValue);
    const promoProd=document.getElementById("promoProductos");
    promoProd.addEventListener('click',updateOfertas);
    /* Calculo Totales por si recupere el carrito del storage  */
    let [totalCarrito, cantidadTotal] = calculaTotal();
    actualizarTotalCarritoHtml(totalCarrito, cantidadTotal);
    const btnCarrito=document.querySelector('#btnCarrito');
    btnCarrito.addEventListener('click', () => {displaycarrito()});
    const btn1=document.querySelector('#btnVaciarCarrito');
    btn1.addEventListener('click', (e) => {    
        e.preventDefault();
        Swal.fire({
            title: 'Estas Seguro de Vaciar el Carrito?',
            text: "Todavia estas a tiempo!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Borrar!'
        }).then((result) => {
            if (result.isConfirmed) {
                vaciarCarrito();
                Swal.fire({
                    title: 'Borrado!',
                    icon: 'success',
                    text: 'Carrito Borrado!'
                })
            }
        })
    });
})

