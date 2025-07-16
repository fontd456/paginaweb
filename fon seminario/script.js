let carrito = [];

function agregarAlCarrito(nombre, precio) {
  const existente = carrito.find(item => item.nombre === nombre);
  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }
  mostrarCarrito();
}

function pedirProducto(nombre, precio) {
  agregarAlCarrito(nombre, precio);
  document.getElementById("carrito").scrollIntoView({ behavior: "smooth" });
}

function mostrarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const totalIVA = document.getElementById("total-con-iva");
  lista.innerHTML = "";

  let total = 0;

  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nombre} - $${item.precio} x ${item.cantidad} 
      = $${item.precio * item.cantidad}
      <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
      <ul id="lista-carrito"></ul>
<span id="total-con-iva">0.00</span>

    `;
    lista.appendChild(li);
    total += item.precio * item.cantidad;
  });

  totalIVA.textContent = (total * 1.07).toFixed(2);
}

function eliminarDelCarrito(index) {
  if (carrito[index].cantidad > 1) {
    carrito[index].cantidad -= 1;
  } else {
    carrito.splice(index, 1);
  }
  mostrarCarrito();
}

document.getElementById("formulario-compra").addEventListener("submit", function (e) {
  e.preventDefault();

  const tarjeta = this.querySelector('input[type="text"][maxlength="16"]').value;

  if (!/^\d{16}$/.test(tarjeta)) {
    alert("Por favor ingresa una tarjeta válida de 16 dígitos numéricos.");
    return;
  }

  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  alert("¡Gracias por tu compra!");
  carrito = [];
  mostrarCarrito();
  this.reset();
});
