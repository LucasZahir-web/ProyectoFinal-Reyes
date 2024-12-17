const productos = [
    { id: "1", nombre: "Iphone 11", precio: 360, imagen: "foto1.jpeg" },
    { id: "2", nombre: "Iphone 11 Pro Max", precio: 420, imagen: "foto2.jpeg" },
    { id: "3", nombre: "Iphone 13", precio: 630, imagen: "foto3.jpeg" },
  ];
  
  const productosContainer = document.getElementById("productos");
  const carritoContainer = document.getElementById("lista-carrito");
  const totalContainer = document.getElementById("total");
  const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
  
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  
  function renderizarProducto(producto) {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
      <img src="img/${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>$${producto.precio}</p>
      <button data-id="${producto.id}" class="btn-agregar">Agregar al Carrito</button>
    `;
    productosContainer.appendChild(div);
  }
  
  productos.forEach(renderizarProducto);
  
  productosContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-agregar")) {
      const id = e.target.getAttribute("data-id");
      agregarAlCarrito(id);
    }
  });
  
  function agregarAlCarrito(id) {
    const productoExistente = carrito.find((prod) => prod.id === id);
  
    if (productoExistente) {
      productoExistente.cantidad++;
    } else {
      const producto = productos.find((prod) => prod.id === id);
      carrito.push({ ...producto, cantidad: 1 });
    }
  
    Swal.fire({
      title: "Producto agregado!",
      icon: "success",
      timer: 1000,
      showConfirmButton: false,
    });
  
    actualizarCarrito();
  }
  
  function actualizarCarrito() {
    carritoContainer.innerHTML = "";
    let total = 0;
  
    carrito.forEach((producto) => {
      total += producto.precio * producto.cantidad;
  
      const li = document.createElement("li");
      li.textContent = `${producto.nombre} - $${producto.precio} x ${producto.cantidad}`;
      carritoContainer.appendChild(li);
    });
  
    totalContainer.textContent = total;
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
  
  vaciarCarritoBtn.addEventListener("click", () => {
    carrito = [];
    Swal.fire({
      title: "Carrito Vacío!",
      icon: "info",
      timer: 1000,
      showConfirmButton: false,
    });
    actualizarCarrito();
  });
 
  actualizarCarrito();
  