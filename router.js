const express = require("express");
const router = express.Router();
const sql = require("mssql");
const conexion = require("./database/db");

var request = new sql.Request();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/dashboard", (req, res) => {
  request.query("SELECT * FROM Productos", (err, results) => {
    if (err) {
      throw err;
    } else {
      res.render("dashboard", { results: results });
    }
  });
});

router.get("/create", (req, res) => {
  res.render("create");
});

router.post("/save", (req, res) => {
  let data = {
    Id_Producto: "",
    Nombre: req.body.nombre,
    Precio: req.body.precio,
    Peso: req.body.peso,
    Descripcion: req.body.descripcion,
    Imagen: req.body.imagen,
    Categoria: req.body.categoria,
    Cantidad: req.body.cantidad,
    NombreCategoria: req.body.nombreCategoria,
  };
  let consulta = "INSERT INTO Productos SET ?";

  request.query(consulta, data, function (err, results) {
    if (err) {
      throw err;
    } else {
      res.redirect("/dashboard");
    }
  });
});

// const crud = require("./controllers/crud");
// router.post("/save", crud.save);

module.exports = router;
