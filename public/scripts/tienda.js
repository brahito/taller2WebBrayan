function paginaCargada(){

    var rango = document.querySelector('.input-rango');
    function buscarPorPrecio(){
        console.log(rango.value);
        location.href = '/tienda/Diseño?precio=' + rango.value;
    }
    if(rango != null){
        rango.addEventListener('change', buscarPorPrecio);
    }

    var listaProductos = [];
    if(localStorage.getItem('listaProductos') != null){
        listaProductos = JSON.parse(localStorage.getItem('listaProductos'));
    }

    var carritoNum = document.querySelector('.carrito__num');
    var listaCarrito = document.querySelector('.carrito-desplegado__lista');

    function actualizarCarrito(){
        carritoNum.innerHTML = listaProductos.length;
    
        //listaCarrito.innerHTML = '';
        /*listaProductos.forEach(function(producto){
            listaCarrito.innerHTML += '<img src="' + producto.imagen + '" width="50">' + producto.nombre;
        });*/
    }

    actualizarCarrito();

    var botones = document.querySelectorAll('.producto__carrito');
    function recorrerBotones(boton){
        function agregarAlCarrito(){
            var padre = boton.parentNode;
            var nombre = padre.querySelector('.producto__nombre').innerText;
            var precio = padre.querySelector('.producto__precio').innerText;
            //var imagen = padre.querySelector('.producto__imagen').src;
            var producto = {
                nombre: nombre,
                precio: precio,
               // imagen: imagen,
            };
            
            listaProductos.push(producto);
            actualizarCarrito();
            localStorage.setItem('listaProductos', JSON.stringify(listaProductos));
        }
        boton.addEventListener('click', agregarAlCarrito);
    }
    botones.forEach(recorrerBotones);


    var botonProductoDetalle = document.querySelector('.producto-detalle__carrito');
    function agregarAlCarritoDetalle(){
        var nombre = document.querySelector('.producto__nombre').innerText;
        var precio = document.querySelector('.producto__precio').innerText;
        var imagen = document.querySelector('.producto__imagen').src;
        var producto = {
            nombre: nombre,
            precio: precio,
            imagen: imagen,
        };
        
        listaProductos.push(producto);
        carritoNum.innerHTML = listaProductos.length;
        localStorage.setItem('listaProductos', JSON.stringify(listaProductos));
    }
    if(botonProductoDetalle != null){
        botonProductoDetalle.addEventListener('click', agregarAlCarritoDetalle);
    }

    

}
window.addEventListener('load', paginaCargada);