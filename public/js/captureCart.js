const btnComprar = document.querySelector(".btnComprar");

const form = document.querySelectorAll(".product-container");

const inputIdProducto = document.querySelectorAll("#id_producto");
const inputPrecio = document.querySelectorAll("#precio");
const inputCantidad = document.querySelectorAll("#cantidad");

let arregloProductos = [];
btnComprar.addEventListener("click", async (e) => {
  // e.preventDefault();
  let responseId = await fetch("/IdUsuario");
  let dataId = await responseId.json();
  const usuario = dataId.idUsuarioDevuelto;
  console.log(usuario);

  form.forEach((element) => {
    const producto = {
      id: element.querySelector("#id_producto").value,
      precio: element.querySelector("#precio").value,
      cantidad: element.querySelector("#cantidad").value,
      idUsuario: usuario,
    };
    arregloProductos.push(producto);
  });
  console.log(arregloProductos);

  let longitudArreglo = arregloProductos.length;
  let response = await fetch("/payDoneMultiple", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ arregloProductos, longitudArreglo }),
  });
  let data = await response.json();
  console.log(data);
  window.location.href = "/";
});
