Esta aplicación web es una tienda virtual de ropa. En ella se podraán seleccionar artículos como pantalones, camisetas, acesorios, entre otros. Estos articulos 
se irán agregando al carrito de compras donde se calculara inmediatamente el valor total a pagar incluyendo los descuentos a que haya lugar por cuenta de promociones. En el carrito de compras se
podrá cambiar la cantidad de articulos a llevar, tambíen se podrán eliminar los articulos que no se deseen.

En esta aplicación cada vez que el usuario quiere agregar una prenda al carrito de compras, se crea un objeto de tipo artículo, donde este objeto se analiza
con el fin de saber si ya esta agregado al carro de compras o es una prenda nueva. Si es una prenda nueva, se guardara en un arreglo que contendrá todos 
los objetos creados. Si ya esta en la lista del carrito de compras se procede a aumentar en 1 la cantidad de la prenda seleccionada.
Para mostrar los productos en el carrito de compras se procede a leer el arreglo que contiene los objetos. Este arreglo es temporal y al refrescar la página se perderan los datos.

Este proyecto cuenta solamente con la parte visual y operativa interna, no cuenta con conexion a un servidor para procesar las compras o pagos.
