const btnCapturarId = document.querySelector(".btnCapturarId");
const id_producto = document.querySelector(".id_producto");
btnCapturarId.addEventListener("click", async (e) => {
  e.preventDefault();
  let Id = id_producto.value;
  let response = await fetch("/sendID", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ Id: Id }),
  });
  let data = await response.json();

  const { results3 } = data;
  console.log(results3);
  const IdSelected = (document.querySelector(".Id").innerHTML =
    results3.Id_Producto);
  const Nombre = (document.querySelector(".Nombre").innerHTML =
    results3.Nombre);
  const Precio = (document.querySelector(".Precio").innerHTML =
    results3.Precio);
  const Peso = (document.querySelector(".Peso").innerHTML = results3.Peso);
  const Descripcion = (document.querySelector(".Descripcion").innerHTML =
    results3.Descripcion);
  const Imagen = (document.querySelector(".Imagen").innerHTML =
    results3.Imagen);
  const IdCategoria = (document.querySelector(".IdCategoria").innerHTML =
    results3.Id_Categoria);
  const Cantidad = (document.querySelector(".Cantidad").innerHTML =
    results3.Cantidad);
  const Grosor = (document.querySelector(".Grosor").innerHTML =
    results3.Grosor);
  const Material = (document.querySelector(".Material").innerHTML =
    results3.Material);
  const CostoPuntos = (document.querySelector(".CostoPuntos").innerHTML =
    results3.Costo_Puntos);
  const ValorPuntos = (document.querySelector(".ValorPuntos").innerHTML =
    results3.Valor_Puntos);
  const IdProveedor = (document.querySelector(".IdProveedor").innerHTML =
    results3.Id_Proveedor);
  const Marca = (document.querySelector(".Marca").innerHTML = results3.Marca);
  const NombreCategoria = (document.querySelector(
    ".NombreCategoria"
  ).innerHTML = results3.Nombre_Categoria);
  // btnEditar.href = `/edit/${results3.Id_Producto}`;
  const edit = (document.querySelector(
    ".edit"
  ).href = `/edit/${results3.Id_Producto}`);

  const btnDelete = (document.querySelector(
    ".delete"
  ).href = `/delete/${results3.Id_Producto}`);
  btnEditar.href = `hola`;
  btnEliminar.href = `/delete/${results3.Id_Producto}`;
});
