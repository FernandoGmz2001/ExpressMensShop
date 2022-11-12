const express = require("express");
const router = express.Router();
const sql = require("mssql");
const conexion = require("./database/db");
const session = require("express-session");

var request = new sql.Request();

//Dashboard
router.get("/dashboard", (req, res) => {
  request.query("SELECT * FROM Productos", (err, results) => {
    if (err) {
      throw err;
    } else {
      res.render("dashboard", { results: results });
    }
  });
});

//Dashboard users
router.get("/users", (req, res) => {
  request.query("SELECT * FROM Usuarios", (err, results) => {
    if (err) {
      throw err;
    } else {
      res.render("users", { results: results });
    }
  });
});

//Ruta crear producto
router.get("/create", (req, res) => {
  res.render("create");
});

//Ruta registrar usuario
router.get("/register", (req, res) => {
  res.render("register");
});

//Ruta iniciar sesión

const crud = require("./controllers/crud");
router.post("/save", crud.save);
router.get("/edit/:id", crud.edit);
router.post("/update", crud.update);
router.get("/delete/:id", crud.delete);
router.get("/productPage/:id", crud.productPage);

router.post("/register", crud.register);

router.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
router.post("/auth", crud.authUser);
router.get("/login", crud.login);
router.get("/logout", crud.logout);
router.get("/", crud.home);

module.exports = router;
