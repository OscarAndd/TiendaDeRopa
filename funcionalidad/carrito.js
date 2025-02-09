let miCarrito = [];
let idProducto = 0;
let carritomenu = document.getElementById("micarrito");
let nombre;
let talla;
let precio;
let cantidad = 1;
var imgFullURL;
let flag = 0;
let inicio = 0;
var jug;

document.getElementById("tabla").innerHTML = "";//BORRAR LA TABLA MODELO

//(CONSTRUCTOR) CON ESTO CREO LOS OBJETOS DE TIPO PRODUCTO:
function producto(id, nombre, talla, precio, imagen, cantidad) {
    this.id = id;
    this.nombre = nombre;
    this.talla = talla;
    this.precio = precio;
    this.imagen = imagen;
    this.cantidad = cantidad;
}

document.getElementById('miTienda').addEventListener('click', function (event) {//ESTOY PENDIENTE A LOS CLICKS SOBRE MI APP
    if (event.target.nodeName === 'BUTTON') {//SI EL CLICK SE HIZO SOBRE UN BOTON

        //IDENTIFICO LOS ANCESTROS DEL ELEMEMTO DONDE SE HIZO EL CLICK Y TENGAN NOMBRE DE CLASE .producto:
        const content = event.target.closest('.producto');
        //console.log(content);
        //ASIGNO UN ID UNICO A CADA PRODUCTO AGREGADO AL CARRITO:
        idProducto++;
        //OBTENGO LOS VALORES UNICOS DE CADA PRODUCTO SELECCIONADO CON AYUDA DEL ANCESTRO;
        nombre = content.querySelector("#nombre").innerHTML;
        talla = content.querySelector("#talla").innerHTML;
        precio = content.querySelector("#precio").innerHTML;
        imgFullURL = content.querySelector('img').src;

        //CUANDO AGREGO UN PRODUCTO EL LOGO DEL CARRITO CAMBIA A NO VACIO:
        document.getElementById("carritoVacio").style.backgroundImage = "url(../carritolisto.png)";
        //CREO UN NUEVO OBJETO DE TIPO PRODUCTO CON LOS DATOS UNICOS DEL PRODUCTO SELECCIONADO:
        jug = new producto(idProducto, nombre, talla, precio, imgFullURL, cantidad);
        //SI EL CARRITO ESTA VACIO ENTONCES ACTIVO LA BANDERA PARA AGREGAR A LA LISTA DE PRODUCTOS:
        if (miCarrito.length == 0) {
            flag = 1;
        }
        //SI NO ESTA VACIO BUSCO SI EL PRODUCTO YA EXISTE O ES UN PRODUCTO NUEVO
        //PARA ESTO UTILIZO EL NOMBRE DE LA IMAGEN, EL CUAL ES UNICO PARA CADA PRODUCTO:
        else {
            for (let i = 0; i < miCarrito.length; i++) {
                //COMPARO LA IMAGEN ACTUAL CON LAS IMAGENES QUE YA ESTAN EN LA LISTA:
                if (miCarrito[i].imagen == imgFullURL) {//SI YA EXISTE  
                    //console.log("imagen existe");
                    flag = 0;//DESACTIVO LA BANDERA PARA NO REPETIR LA IMAGEN EL CARRITO
                    miCarrito[i].cantidad++;//AUMENTO LA CANTIDAD DE ESE PRODUCTO
                    //LLAMO A LA FUNCION DE PUBLICAR PARA ACTUALIZAR LA CANTIDAD DE PRODUCTOS VISUALMENTE
                    //PASANDO COMO PARAMETRO LA LISTA DE LOS PRODUCTOS A MOSTRAR
                    publicar(miCarrito);
                    break;
                }
                else {
                    //console.log("imagen no existe")
                    flag = 1;
                }
            }
        }

        if (flag) {//SI NO EXISTE EL PRODUCTO O LA LISTA ESTA VACIA:
            miCarrito.unshift(jug);//AGREGO A LA LISTA EL NUEVO PRODUCTO
            publicar(miCarrito);//LLAMO A LA FUNCION QUE ME PERMITE MOSTRAR LOS PRODUCTOS DE LA LISTA
            flag = 0//VUELVO A CONDICIONES INICIALES
        }
        //SI QUIERO AGREGAR UN PRODUCTO, AUTOMATICAMENTE ABRE EL CARRITO DE COMPRAS:
        carritomenu.style.left = "69.2vw";
    }
    //SI NO OPRIMI SOBRE UN BOTON Y EL MENU DE CARRITO DE COMPRAS ESTA ABIERTO, ENTONCES SE CIERRA:
    else {
        if (carritomenu.style.left === "69.2vw") {
            carritomenu.style.left = "100vw";
        }
    }

});

//VOY A MOSTRAR EN EL CARRITO DE COMPRAS TODOS LOS PRODUCTOS QUE ESTEN EN LA LISTA (ARREGLO)
//EN ESTE CASO LA LISTA SE RECIBE ATRAVEZ DE LA FUNCION Y SE USA PARA SACAR LA INFORMACION
function publicar(datos) {
    document.getElementById("tabla").innerHTML = "";//BORRO LO QUE TENGA LA TABLA Y ASI ACTUALIZO EL CONTENIDO
    //console.log(datos);
    //AGREGO NUEVAS FILAS CON CIERTAS CARACTERISTICAS Y ELEMENTOS EN SU INTERIOR, PARA DAR FORMA 
    //AL MENU DE CARRITO DE COMPRAS. EL PROCESO SE REPITE HASTA MOSTRAR TODO EL CONTENIDO DE LA LISTA DE PRODUCTOS
    for (let i = 0; i < datos.length; i++) {
        document.getElementById('tabla').insertRow(-1).innerHTML = `<td><p class="detallesProducto">Detalles producto:</p></td>`
        document.getElementById('tabla').insertRow(-1).innerHTML = `<td rowspan="4"><img style="background-image: url(${datos[i].imagen});" class="preview" id="preview"></img></td><td><p id="nombre1" class="nombre1">${datos[i].nombre}</p></td><td rowspan="4"> <button class="eliminar" id=${datos[i].id}></button></td>`
        document.getElementById('tabla').insertRow(-1).innerHTML = `<td><p id="talla1" class="talla1">${datos[i].talla}</p></td>`
        document.getElementById('tabla').insertRow(-1).innerHTML = `<td><p id="precio1" class="precio1">${datos[i].precio}</p></td>`
        document.getElementById('tabla').insertRow(-1).innerHTML = `<td ><input type="number" placeholder="Cantidad" id=${datos[i].id} class="cantidad" name="cantidad" value=${datos[i].cantidad}></input></td>`
    }
    inicio = 0;//ES UNA BANDERA QUE SIRVE PARA MOSTRAR MENSAJE DE CARRITO VACIO
    //LLAMO A LA FUNCION QUE CALCULA EL TOTAL EN DINERO QUE DEBE PAGAR LA PERSONA POR TODO EL CONTENIDO DEL CARRITO DE COMPRAS:
    calcularTotal(); 
}

//VOY A ESCUCHAR CUALQUIER CLICK PRODUCIDO SOBRE LOS ELEMENTOS DEL CARRIDO DE COMPRAS
document.getElementById('tabla').addEventListener('click', function (event) {

    if (event.target.nodeName === 'BUTTON') {//SI EL CLICK SE HIZO SOBRE UN BOTON, ENTONCES
        const conten = event.target.closest('.eliminar');//OBTENGO LOS ELEMENTOS ANCESTROS DEl ELEMENTO DE CLASE eliminar
        let confirmardelete = confirm("¿Desea eliminar este producto del carrito de compras?");
        if (confirmardelete) { //SI CONFIRMO QUE SE ELIMINARA EL PRODUCTO SELECCIONADO, ENTONCES
            let myid = conten.id; //TOMO EL ID DEL PRODUCTO A ELIMINAR
            let index = miCarrito.findIndex(x => x.id == myid); //RELACIONO EL ID CON LA POSICION EN LA LISTA
            //console.log(index);
            miCarrito.splice(index, 1);//ELIMINO EL PRODUCTO SELECCIONADO DE LA LISTA
            publicar(miCarrito);//ACTUALIZO LA INTERFAZ
            //SI YA NO QUEDAN ELEMENTOS EN LA LISTA MUESTRO MENSAJE DE CARRITO VACIO Y CAMBIO EL ICONO DEL CARRITO:
            if (miCarrito.length == 0) {
                document.getElementById("carritoVacio").style.backgroundImage = "url(../carritosolo.png)";
                noProductos();
                inicio++;
            }
        }
    }
    if (event.target.nodeName === 'INPUT') {//SI EL CLICK SE HACE SOBRE EL INPUT
        const conten = event.target.closest('.cantidad');//OBTENGO LOS ELEMENTOS ANCESTROS DEl ELEMENTO DE CLASE cantidad
        //console.log(conten);
        let myid = conten.id;//OBTENGO EL ID DEL PRODUCTO DONDE HICE CLICK
        let index = miCarrito.findIndex(x => x.id == myid);//RELACIONO CON LA POSICION DENTRO DE LA LISTA
        miCarrito[index].cantidad = conten.value;//ACTUALIZO LA CANTIDAD DE PRODUCTOS A COMPRAR EN LA LISTA
        calcularTotal();
    }
});


function calcularTotal() {
    let subtotal = 0;
    let total;
    for (const element of miCarrito) {//RECORRE TODOS LOS ELEMENTOS DE LA LISTA DE PRODUCTOS
        let precio = element.precio.slice(1);//RETIRO EL PRIMER INDEX DEL STRING
        subtotal += parseInt(precio) * element.cantidad;
     }
    if (subtotal >= 120) {//APLICO LA PROMOCION ACTUAL
        subtotal -= subtotal * 0.15;
    }
    //DOY FORMATO DE MILES AL RESULTADO Y MULTIPLICO POR 1000 PARA VOLVER A LAS UNIDADES ORIGINALES
    subtotal = new Intl.NumberFormat("es-CL").format(subtotal * 1000);

    total = "TOTAL: " + "$" + subtotal.toString();

    document.getElementById("total").innerHTML = total;//PUBLICO EL TOTAL
}

function mostrarCarrito() {
    if (carritomenu.style.left === "69.2vw") {
        carritomenu.style.left = "100vw";
    }
    else {
        carritomenu.style.left = "69.2vw";
        if (miCarrito.length == 0 && inicio == 0) {
            inicio++;
            noProductos();
        }
    }

}

function noProductos() {//MUESTRO UN MENSAJE CUANDO EL CARRITO DE COMPRAS NO TIENE PRODUCTOS
    document.getElementById('tabla').insertRow(-1).innerHTML = `<th><p class="sinproductos">Tu bolsa de compras está vacia
    actualmente. </p></th>`

}