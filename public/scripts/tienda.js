
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
    var subtotal = document.querySelector('.carrito__subtotal');
    
    function actualizarCarrito(){
        var suma = 0;
        carritoNum.innerHTML = listaProductos.length;
        if(listaCarrito !== null){
        listaCarrito.innerHTML = '';
        listaProductos.forEach(function(producto,index){
            if(producto.precio.length !== null){
                var temp = new String();
                for (let i = 1; i < producto.precio.length; i++) {
                    temp += producto.precio[i];
                }
                suma += parseInt(temp);
                
            }
            subtotal.innerHTML = '<p>$'+ suma + '</p>';
            listaCarrito.innerHTML += '<li class = "carrito__opciones"><img src="' + producto.imagen + '" width="200">' + '<p>'+producto.nombre+'</p>' + '<p>'+producto.precio+ '</p> </li>';
        });
    }
    }

    actualizarCarrito();

    var botones = document.querySelectorAll('.producto__carrito');
    function recorrerBotones(boton){
        function agregarAlCarrito(){
            //var padre = boton.parentNode;
            var nombre = document.querySelector('.producto__nombre').innerText;
            var precio = document.querySelector('.producto__precio').innerText;
            var imagen = document.querySelector('.producto__imagen').src;
          
            var producto = {
                nombre: nombre,
                precio: precio,
                imagen: imagen,
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