const alicuota = 21;
let nombreProducto = ""
let skuProducto = 0
let idArtnew=0
let productos =[];

/* oculto spinner */
document.getElementById("spinner").style.display="none";
document.getElementById("spinner").style.marginLeft="50%";
document.getElementById("spinner").style.marginTop="5%";

/* Obtengo carrito del storage o creo uno vacio*/
const carrito = JSON.parse(localStorage.getItem("carrito")) ?? {};
const ofertaArray = [];

/* Funcion asincrona para traer productos del json */
const traerProductosEnJson = async () => {
    const response = await fetch('./json/productos.json');
    const informacion = await response.json();
    productos = informacion;
}

const TraerProductoMercadoLibre = async (textoBuscar) => {
    const response = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${textoBuscar}`);
    const informacion = await response.json();
    document.getElementById("spinner").style.display="block";
    await accionAsincrona();
    let productosMl = [];
    let xid=0
    informacion.results.forEach((item) => {
        productosMl[xid] = { nombre: item.title.toUpperCase() , sku: item.id , precio: item.price , stock: 0 , oferta: false , "imagenMeli": true , "novedad": false, imagenArt: item.thumbnail };
        xid += 1
    });
    productos.splice(0, productos.length);
    productos = productosMl;
    document.getElementById("spinner").style.display="none";
}

const accionAsincrona = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 250);
    });   
}

function buscaOferta(idArt){
    const productosBuscados = productos.find(producto => producto.sku===idArt);
    return productosBuscados.oferta;
}

function limpiarProductoshtml(){
    let nuevos = document.querySelector("#ProductosNuevos");
    nuevos.innerHTML = "";
}

function agregaProductohtml({sku: idArt,nombre: nombreProducto, precio: precioProducto, oferta: ofertaProducto, imagenArt, imagenMeli}){
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
    imagenArticulo.className = "imagenPequenia";
    if (imagenMeli){
        imagenArticulo.className +=(imagenMeli) ? " imagenMercadoLibre":"card-img-top";
    };
    imagenArticulo.src = imagenArt;
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
    console.log(carrito);
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
    };
    const btnModal=document.getElementById("btnCarrito");
    if (cantidadTotal !=0){
        btnModal.setAttribute("data-bs-target","#myModal");
        btnModal.setAttribute("data-bs-toggle","modal");
    } else {
        btnModal.setAttribute("data-bs-toggle","");
        btnModal.setAttribute("data-bs-target","");
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
function ordenarPrecio() {
    const productosOrdenados = [...productos]
    const resultado=productosOrdenados.sort((a,b) => a.precio - b.precio);
    mostrarResultado(resultado);
}
function ordenarNombre() {
    const productosOrdenados = [...productos]
    const resultado=productosOrdenados.sort((a,b) => a.nombre.localeCompare(b.nombre));
    mostrarResultado(resultado);
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
function buscarNovedades() { 
    const productosBuscados = productos.filter(producto => producto.novedad);
    return productosBuscados;
}
function updateValue(e) {
    let letras=e.srcElement.value;
    letras=letras.toUpperCase();
    const resultado = buscarProductos(letras);
    mostrarResultado(resultado);
}
function updateOfertas() {
    const resultado = buscarOfertas();
    mostrarResultado(resultado);
}
function updateNovedades() {
    const resultado = buscarNovedades();
    mostrarResultado(resultado);
}
function mostrarResultado(resultado) {
    limpiarProductoshtml();
    for (const producto of resultado) {
        agregaProductohtml(producto);
    }
    /* desestructuro return  */
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
        background: `linear-gradient(to left, ${color1}, ${color2})`,
        },
        duration: 3000
    }).showToast();
}    
function controlNombreInput(e) {
    if (e.target.value.length <3){
        e.target.style.border = '1px solid red';
    } else{
        e.target.style.border = '1px solid green';
    }
}
function controlEmailInput(e) {
    if (e.target.value.length <6){
        e.target.style.border = '1px solid red';
    } else{
        if (e.target.value.includes("@")){
            e.target.style.border = '1px solid green';
        } else {
            e.target.style.border = '1px solid red';
        }
    }
}
function controlTelefonoInput(e) {
    if (e.target.value.length <8){
        e.target.style.border = '1px solid red';
    } else{
        e.target.style.border = '1px solid green';
    }
}
function controlNombre() {
    const inputId = document.getElementById("lname");
    const caracteres = inputId.value.length;
    if (caracteres<2){
        Swal.fire({
            title: 'Falta el Nombre!!!',
            icon: 'warning',
            text: 'Debe ingresar su Nombre, Gracias'
        })
        return false
    } else {
        return true;
    }
}

function controlEmail() {
    const imputIdEmail = document.getElementById("email");
    const emailCompra = imputIdEmail.value;
    if (emailCompra.length<2){
        Swal.fire({
            title: 'Falta el Email!!!',
            icon: 'warning',
            text: 'Debe ingresar un Email Valido, Gracias'
        })
        return false
    } else {
        if (emailCompra.includes("@")){
            return true
        } else {
            Swal.fire({
                title: 'Debe incluir @ en el mail !!!',
                icon: 'warning',
                text: 'Debe ingresar un Email Valido, Gracias'
            })
            return false
        }
    }
}
function controlTelefono() {
    const imputIdTel = document.getElementById("phone");
    const telCompra = imputIdTel.value;
    if (telCompra.length<8){
        Swal.fire({
            title: 'Telefono incorrecto!!!',
            icon: 'warning',
            text: 'Debe ingresar un telefono Valido, Gracias'
        })
        return false
    } else {
        return true
    }
}
function displaycarrito() {
    let [totalCarrito, cantidadTotal] = calculaTotal();
    if (totalCarrito!=0){
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
        const finCompra=document.getElementById("guardarCompra");
        finCompra.addEventListener('click',limpoFinCompra(finCompra));
    }else{
        Swal.fire({
            title: 'Carrito Vacio',
            icon: 'warning',
            text: 'Tiene que haber al menos un producto!!'
        })
    }        
}
function limpoFinCompra(finCompra){
    finCompra.addEventListener('click',  function(e) {
        e.preventDefault();
        if (controlNombre() && controlEmail() && controlTelefono()){
            vaciarCarrito();
            Swal.fire({
                title: '!!! Compra Exitosa !!!',
                icon: 'success',
                text: 'En breve lo contactaremos para pactar la entrega'
            }).then((result) => {
                const actualizo=document.getElementById("todosProductos")
                actualizo.click();
            })
        }
    })
}
function armoElCarrito() {
    /*  Armo el html con los productos */
    for (const producto of productos) {
        agregaProductohtml(producto);
    }
    const imputId = document.getElementById("fname");
    imputId.addEventListener('input',updateValue);

    const todoProd=document.getElementById("todosProductos");
    todoProd.addEventListener('click',updateValue);

    const promoProd=document.getElementById("promoProductos");
    promoProd.addEventListener('click',updateOfertas);

    const novedadProd=document.getElementById("novedades");
    novedadProd.addEventListener('click',updateNovedades);

    /* Calculo Totales por si recupere el carrito del storage  */
    let [totalCarrito, cantidadTotal] = calculaTotal();
    actualizarTotalCarritoHtml(totalCarrito, cantidadTotal);
    const btnCarrito=document.querySelector('#btnCarrito');
    btnCarrito.addEventListener('click', () => {displaycarrito()});
    const btn1=document.querySelector('#btnVaciarCarrito');
    btn1.addEventListener('click', (e) => {    
        e.preventDefault();
        let [totalCarrito, cantidadTotal] = calculaTotal();
        if (totalCarrito!=0){
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
        } else{
            Swal.fire({
                title: 'Carrito Vacio',
                icon: 'warning',
                text: 'Tiene que haber al menos un producto!!'
            })
        }
    });
}
function updateValueTexto(e) {
    let letras=e.srcElement.value;
    letras=letras.toUpperCase();
    return letras;
}
function updateValueMerlib(){
    const imputId = document.getElementById("fname");
    const texto = imputId.value;
    if(texto==""){
        Swal.fire({
            title: 'Mercado Libre',
            icon: 'warning',
            text: 'Falta texto en buscar!!'
        })
    } else {
        limpiarProductoshtml();
        TraerProductoMercadoLibre(texto).then( () => { 
            ordenarNombre();
            armoElCarrito();
        })
    }
}
function updateValueTablaLocal(){
    limpiarProductoshtml();
    traerProductosEnJson().then( () => { 
        const imputId = document.getElementById("fname");
        const texto = imputId.value.toUpperCase();
        const resultado= (texto != "") ? buscarProductos(texto):[];
        for (const producto of resultado) {
            agregaProductohtml(producto);
        }        
    })
}
const ordenPrecio=document.getElementById("OrdenPrecio")
ordenPrecio.addEventListener('click',ordenarPrecio)

const ordenNombre=document.getElementById("OrdenNombre")
ordenNombre.addEventListener('click',ordenarNombre)

/* =========== Fin funciones ========== */
/* ejecuto la Funcion y cuando tengo la respuesta armo el carrito */
traerProductosEnJson().then( () => { 
    ordenarNombre();
    armoElCarrito();
})

const buscarMerLib=document.getElementById("mercadoLibre");
buscarMerLib.addEventListener('click',updateValueMerlib);

const buscarTablaLocal=document.getElementById("tablaLocal");
buscarTablaLocal.addEventListener('click',updateValueTablaLocal);
