const { corr } = require("../../controllers/crud");

const progress = document.querySelector(".progress-done");
const input = document.querySelector(".input");
const maxInput = document.querySelector(".maxInput");
let finalValue = 300;
let max = 100;

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
