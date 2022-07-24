const alicuota = 21;
let nombreProducto = ""
let skuProducto = 0

const productos =[
    {nombre: 'ALF. MILKA TRIPLE OREO', sku: 1,precio: 170.15,stock: 50,oferta: false,imagenArt: "./imagenes/alf3Oreo.webp"}, 
    {nombre: 'ALF. MILKA TRIPLE DULCE LECHE', sku: 2,precio: 150,stock: 25,oferta: true,imagenArt: "./imagenes/alf3DLeche.jpg"},
    {nombre: 'BARRA CEREAL FORT FRUTILLA', sku: 3,precio: 60,stock: 75,oferta: true,imagenArt: "./imagenes/cerealFortFrutilla.jpg"}, 
    {nombre: 'BARRA COFLER EXTRA MARROC', sku: 4,precio: 125,stock: 40,oferta: false,imagenArt: "./imagenes/CoflerExtraMarroc.jpg"}, 
    {nombre: 'BOMBON BON O BON X 18 UNID.', sku: 5,precio: 480,stock: 20,oferta: true,imagenArt: "./imagenes/bonobon18ud.jpg"},
    {nombre: 'CARAM. BUTTER TOFFEE X 825 GRS', sku: 6,precio: 990,stock: 70,oferta: false,imagenArt: "./imagenes/butterToffees.webp"}, 
    {nombre: 'CHICLE BELDENT INFINIT X UNID.', sku: 7,precio: 200,stock: 80,oferta: true,imagenArt: "./imagenes/BeldemtInfinit.jpg"},
    {nombre: 'CHOC. BIZNIKKE NEVADO X 25 GRS', sku: 8,precio: 95,stock: 10,oferta: false,imagenArt: "./imagenes/biznikkeNevado.jpg"}
];

const haches5 = document.querySelectorAll("h5");
const ofertaArray = [oferta1, oferta2, oferta3, oferta4, oferta5, oferta6, oferta7, oferta8];

function buscaOferta(idArt){
    const productosBuscados = productos.find(producto => producto.sku===idArt);
    return productosBuscados.oferta;
}

function eliminaOferta(idOferta){
    const elemento = document.getElementById(ofertaArray[idOferta].textContent="");
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
    imagenArticulo.src = imagenArt     &&"./imagenes/menthoplus.jpg"
    imagenArticulo.alt = "Imagen de Menthoplus";
    divOferta0.appendChild(imagenArticulo);
    console.log(imagenArticulo);
    
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

    /* div.textContent = `Item número ${i}`; */
    
    fragment.appendChild(divOferta);
    console.log(divOferta);
    
    /* document.body.appendChild(fragment); */
    /* padre.appendChild(fragment); */
    nuevos.appendChild(fragment);

}


for (let i = 0; i < (haches5.length); i++) {
    
    if (buscaOferta(i+1)){
        haches5[i].style.color = "red";
        /* console.log(haches5[i+1]); */
    } else{
        /* ofertaArray[i].remove(); */
        eliminaOferta(i);
    }
}
agregaProductohtml(9, "PAST. MENTHOPLUS S/AZUCAR X 12 DURAZNO", 506, true,"./imagenes/menthoplus.jpg");


