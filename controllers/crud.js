const conexion = require("../database/db");
const sql = require("mssql");
var request = new sql.Request();

exports.save = (req, res) => {
  const nombre = req.body.nombre;
  const precio = req.body.precio;
  const peso = req.body.peso;
  const descripcion = req.body.descripcion;
  const imagen = req.body.imagen;
  const categoria = req.body.categoria;
  const cantidad = req.body.cantidad;
  const nombreCategoria = req.body.nombreCategoria;

  var consulta = `INSERT INTO Productos (Nombre,Precio,Peso,Descripcion,Imagen,Categoria,Cantidad,NombreCategoria) VALUES ('${nombre}','${precio}','${peso}','${descripcion}','${imagen}','${categoria}','${cantidad}','${nombreCategoria}')`;

  request.query(consulta, (err, rows) => {
    if (err) {
      throw err;
    } else {
      res.redirect("/dashboard");
    }
  });
};

exports.update = (req, res) => {
  const id = req.body.id;
  const nombre = req.body.nombre;
  const precio = req.body.precio;
  const peso = req.body.peso;
  const descripcion = req.body.descripcion;
  const imagen = req.body.imagen;
  const categoria = req.body.categoria;
  const cantidad = req.body.cantidad;
  const nombreCategoria = req.body.nombreCategoria;

  var consulta = `UPDATE Productos SET Nombre='${nombre}',Precio='${precio}',Peso='${peso}',Descripcion='${descripcion}',Imagen='${imagen}',Categoria='${categoria}',Cantidad='${cantidad}',NombreCategoria='${nombreCategoria}' WHERE Id_Producto = ${id}`;

  request.query(consulta, (err, rows) => {
    if (err) {
      throw err;
    } else {
      res.redirect("/dashboard");
    }
  });
};
