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

  // console.log(data.results3);
  const arregloProductos = data.results3;
  const tbody = document.querySelector(".tbody2");
  tbody.innerHTML = "";
  arregloProductos.forEach((results3) => {
    console.log(results3.Id_Producto);
    const $tr = document.createElement("tr");
    $tr.className = "filterProduct";
    $tr.innerHTML = ` <td class="Id">${results3.Id_Producto}</td>
                <td class="Nombre">${results3.Nombre}</td>
                <td class="Precio">${results3.Precio}</td>
                <td class="Peso">${results3.Peso}</td>
                <td class="Descripcion">${results3.Descripcion}</td>
                <td class="Imagen">${results3.Imagen}</td>
                <td class="IdCategoria">${results3.Id_Categoria}</td>
                <td class="Cantidad">${results3.Cantidad}</td>
                <td class="Grosor">${results3.Grosor}</td>
                <td class="Material">${results3.Material}</td>
                <td class="CostoPuntos">${results3.Costo_Puntos}</td>
                <td class="ValorPuntos">${results3.Valor_Puntos}</td>
                <td class="IdProveedor">${results3.Id_Proveedor}</td>
                <td class="Marca">${results3.Marca}</td>
                <td class="NombreCategoria">${results3.Nombre_Categoria}</td>
                <td class="btnEditar-container">
                  <a href="/edit/${results3.Id_Producto}" class="btnEditar edit">Editar</a>
                </td>
                <td class="btnEliminar-container">
                  <a
                    href="/delete/${results3.Id_Producto}"
                    class="btnEliminar delete"
                    onclick="return confirm('Está seguro de eliminar?')"
                    >Eliminar</a
                  >
                </td>`;
    tbody.appendChild($tr);
  });
});
