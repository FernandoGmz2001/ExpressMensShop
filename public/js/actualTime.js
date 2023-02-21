FechaActual = new Date();
year = FechaActual.getFullYear();
month = FechaActual.getMonth() + 1;
day = FechaActual.getDate();

console.log((fecha = `${year}-${month}-${day}`));
exports.fecha = `${year}-${month}-${day}`;
