FechaActual = new Date();
year = FechaActual.getFullYear();
month = FechaActual.getMonth() + 1;
day = FechaActual.getUTCDate();

exports.fecha = `${year}-${month}-${day}`;
