const btnComprar = document.querySelector(".comprarDildos");
btnComprar.addEventListener("click", (e) => {
  e.preventDefault();
  alert("Gracias por su compra!");
});

// const form = document.querySelectorAll("#IdProductoForm");

// btnComprar.addEventListener("click", (e) => {
//   console.log("first");
// });
// let arregloProductos = [];
// btnComprar.addEventListener("click", async (e) => {
//   e.preventDefault();
//   let responseId = await fetch("/IdUsuario");
//   let dataId = await responseId.json();
//   const usuario = dataId.idUsuarioDevuelto;
//   console.log(usuario);

//   form.forEach((element) => {
//     const producto = {
//       id: element.querySelector("#id_producto").value,
//       precio: element.querySelector("#precio").value,
//       cantidad: element.querySelector("#cantidad_producto").value,
//       idUsuario: usuario,
//     };
//     arregloProductos.push(producto);
//   });
//   console.log(arregloProductos);

//   let response = await fetch("/payDone", {
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     method: "POST",
//     body: JSON.stringify({ arregloProductos }),
//   });
//   let data = await response.json();
//   console.log(data);
//   console.log(first);
// });
