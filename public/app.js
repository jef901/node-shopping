let agregarCarritos = document.querySelectorAll(".agregar-carrito");

let productos = [];

async function obtenerProductos() {
  const respuesta = await axios.get('http://localhost:5000/productos');
  console.log(respuesta.data);
  productos = respuesta.data.productos;
  cargarProductos();
}
obtenerProductos();

function cargarProductos() {
  const container = document.querySelector('.container');

  const productosHtml = productos.map((producto,i) => {
    return (
    `
      <div class="imagen">
            <img src="${producto.image}" alt="${producto.descripcion}" />
            <h3>${producto.nombre}</h3>
            <h3>$${producto.precio}</h3>
            <a class="agregar-carrito carro${i+1}" href="#">Agregar al carrito</a>
          </div>
        `
    )

  })
  if(container) {
    container.innerHTML+= productosHtml.toString().replace(',','');
    agregarCarritoAcciones();
  }

}

function agregarCarritoAcciones() {
  const hoverProducto = document.getElementsByClassName("imagen");
  let agregarCarritos = document.querySelectorAll(".agregar-carrito");
  console.log(hoverProducto);
 
           for (let i=0; i< hoverProducto.length; i++) {
          hoverProducto[i].addEventListener('mouseover',()=>{
             agregarCarritos[i].classList.add('verAgregarCarro')
          })
          hoverProducto[i].addEventListener('mouseout',()=>{
            agregarCarritos[i].classList.remove('verAgregarCarro')
          })
        }
        for (let i=0; i< hoverProducto.length; i++) {
          agregarCarritos[i].addEventListener('click',()=>{
            carritoCantidad(productos[i]);
            costoTotal(productos[i]);
          })
      }
    }   

/*
for (let i = 0; i < agregarCarritos.length; i++) {
  //lop a traves de los productos para el boton agregar carrito agrega evento click
  agregarCarritos[i].addEventListener("click", () => {
    carritoCantidad(productos[i]); //pasa producto y lo muestra en el boton carrito
    costoTotal(productos[i]);
  });
}
*/
function cargandocarritoCantidad() {
  //si el navegador se cierra carga de nuevo la cantidad de  productos
  cantidadProductos = localStorage.getItem("carritoCantidad");
  if (cantidadProductos) {
    document.querySelector(".carrito span").textContent = cantidadProductos;
  }
}

function carritoCantidad(producto) {
  let cantidadProductos = localStorage.getItem("carritoCantidad");
  cantidadProductos = parseInt(cantidadProductos); // convierto en numero el string que viene de la storage
  if (cantidadProductos) {
    localStorage.setItem("carritoCantidad", cantidadProductos + 1);
    document.querySelector(".carrito span").textContent = cantidadProductos + 1;
  } else {
    localStorage.setItem("carritoCantidad", 1);
    //busca el span carrito e informa cantidad productos
    document.querySelector(".carrito span").textContent = 1;
  }
  colocarProducto(producto); //se pasa la info del producto
}

function colocarProducto(producto) {
  // en la funcion de arriba se manejan las cantidades en esta se agregan los productos al localStorage
  let articulosDelCarrito = localStorage.getItem("prodEnCarrito");

  articulosDelCarrito = JSON.parse(articulosDelCarrito); //transformamos de un JSON a un objeto son parecidos per no es lo mismo

  if (articulosDelCarrito != null) {
    //hay algo en la localStorage
    if (articulosDelCarrito != undefined) {
      articulosDelCarrito = {
        ...articulosDelCarrito, //agrega un producto mas al local storage spread operator
        [producto.etiqueta]: producto,
      };
    }

    //hay algun producto almacendado en la localStorage del mismo tipo se lo saca por la etiqueta
    articulosDelCarrito[producto.etiqueta].enCarro += 1; // en el articulo pone uno mas en carro
  } else {
    //sino se crea uno nuevo
    producto.enCarro = 1;
    articulosDelCarrito = {
      [producto.etiqueta]: producto, //array de productos con la etiqueta como indice
    };
  }

  localStorage.setItem("prodEnCarrito", JSON.stringify(articulosDelCarrito)); //se guarda en local storage de objeto string
}

function costoTotal(producto) {
  let costoCarro = localStorage.getItem("totalCost");

  if (costoCarro != null) {
    // como esta guardado en localStorage es un string entonces lo convierto en entero
    costoCarro = parseInt(costoCarro);
    localStorage.setItem("totalCost", costoCarro + producto.precio);
  } else {
    localStorage.setItem("totalCost", producto.precio);
  }
}

function verCarrito() {
  let articulosDelCarrito = localStorage.getItem("prodEnCarrito");
  let costoCarro = localStorage.getItem("totalCost");

  articulosDelCarrito = JSON.parse(articulosDelCarrito);
  let contenedorProductos = document.querySelector(".mostrar-productos");
  console.log(contenedorProductos);
  if (articulosDelCarrito && contenedorProductos) {
    contenedorProductos.innerHTML = "";
    //aqui se usa map para recorrer el array de objetos
    Object.values(articulosDelCarrito).map((articulo) => {
      contenedorProductos.innerHTML += `
    <div class="producto"><ion-icon name="close-circle"></ion-icon> <img src="./images/${
      articulo.etiqueta
    }.jpg" />
    <span class="sm-hide">${articulo.nombre}</span>
            </div>
    <div class="precio">$${articulo.precio},00</div>
    <div class="cantidad">${articulo.enCarro}</div>  
    <div class="total">$${articulo.enCarro * articulo.precio},00</div>    
   `;
    });
    contenedorProductos.innerHTML += `
   <div class="totalContainer">
       <h4 class="totalTitulo">Total</h4>
       <h4 class="canastaTotal">$${costoCarro},00</h4>
   </div>`;
    borrarProdCarrito();
  }
}

function borrarProdCarrito() {
  /* se bajan los datos de localStorage */
  let BotonesBorrar = document.querySelectorAll(".producto ion-icon");
  let CarritoCantidad = localStorage.getItem("carritoCantidad");
  let totalCost = localStorage.getItem("totalCost");
  let prodEnCarrito = localStorage.getItem("prodEnCarrito");
  prodEnCarrito = JSON.parse(prodEnCarrito);
  let Nombreproducto;
  /* se agrega click */
  for (let i = 0; i < BotonesBorrar.length; i++) {
    BotonesBorrar[i].addEventListener("click", () => {
      /* se obtiene nombre carrito cliceado */
      nombreProducto = BotonesBorrar[i].parentElement.textContent
        .toLocaleLowerCase()
        .replace(/ /g, "")
        .trim();

      /* Ajusta nuevamente cantidad de productos y costo del carrito */
      localStorage.setItem(
        "carritoCantidad",
        CarritoCantidad - prodEnCarrito[nombreProducto].enCarro
      );
      localStorage.setItem(
        "totalCost",
        totalCost -
          prodEnCarrito[nombreProducto].precio *
            prodEnCarrito[nombreProducto].enCarro
      );
      //  remueve un elemento del array de objetos
      delete prodEnCarrito[nombreProducto];
      localStorage.setItem("prodEnCarrito", JSON.stringify(prodEnCarrito));

      verCarrito();
      cargandocarritoCantidad();
    });
  }
}

//cargamos las cantidades guardadas y mostramos el carrito al cargar la pagina
verCarrito();
cargandocarritoCantidad();
