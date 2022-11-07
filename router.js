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

router.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  request.query(
    `SELECT * FROM Productos WHERE Id_Producto='${id}'`,
    (err, results) => {
      if (err) {
        throw err;
      } else {
        res.render("edit", { producto: results.recordset[0] });
      }
    }
  );
});

router.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  request.query(
    `DELETE FROM Productos WHERE Id_Producto = '${id}'`,
    (err, results) => {
      if (err) {
        throw err;
      } else {
        res.redirect("/dashboard");
      }
    }
  );
});

const crud = require("./controllers/crud");
router.post("/save", crud.save);

router.post("/update", crud.update);

module.exports = router;
