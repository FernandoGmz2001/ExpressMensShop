import sql from "mssql";
const progress = document.querySelector(".progress-done");
const input = document.querySelector(".input");
const maxInput = document.querySelector(".maxInput");
let finalValue = 300;
let max = 100;

var request = new sql.Request();
const btnMostrarPuntos = document.querySelector(".btnMostrarPuntos");
btnMostrarPuntos.addEventListener("click", () => {
  request.query("SELECT * FROM vw_ProductosCategorias1", (err, results) => {
    console.log(results);
  });
  console.log("Me hiciste click");
});

// input.addEventListener("keyup", () => {
//   finalValue = parseInt(input.value, 10);
//   cambiarAncho();
// });

// maxInput.addEventListener("keyup", () => {
//   max = parseInt(maxInput.value, 10);
//   cambiarAncho();
// });
// function cambiarAncho() {
//   const porcentaje = (finalValue / max) * 100;
//   progress.style.width = `${porcentaje}%`;
//   progress.innerHTML = `${Math.ceil(porcentaje)}%`;
// }
