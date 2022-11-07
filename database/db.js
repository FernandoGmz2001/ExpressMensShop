const sql = require("mssql");
const config = {
  user: "Fernando",
  password: "ferpassword",
  database: "PruebaTienda",
  server: "localhost",
  options: {
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

sql.connect(config, (err) => {
  if (err) {
    console.log("El error de la conexión es :" + err);
    return;
  }
  console.log("¡Conectado a la base de datos!");
});

module.exports = config;
