const express = require("express");
const router = express.Router();
const sql = require("mssql");
const conexion = require("./database/db");
const session = require("express-session");

var request = new sql.Request();

//Mostrar dashboard
router.get("/dashboard", (req, res) => {
  request.query("SELECT * FROM vw_ProductosCategorias1", (err, results) => {
    if (err) {
      throw err;
    } else {
      res.render("dashboard", { results: results.recordsets[0] });
    }
  });
});

router.get("/orders", (req, res) => {
  request.query("SELECT * FROM Pedidos", (err, results) => {
    if (err) {
      throw err;
    } else {
      // let nuevaFecha = sliceFecha(results.recordsets[0].Fecha_Pedido);
      // console.log(nuevaFecha);
      console.log("-------------------------");
      res.render("orders", { results: results.recordsets[0] });
    }
  });
});

router.get("/countMonthSells", (req, res) => {
  var consulta = "EXEC ContarVentas";
  request.query(consulta, (err, results) => {
    if (err) {
      throw err;
    } else {
      console.log(results);
      res.redirect(req.get("referer"));
    }
  });
});

router.get("/carrito", (req, res) => {
  request.query(
    `SELECT * FROM Carrito WHERE Correo_Usuario = '${crud.corr}'`,
    (err, results) => {
      if (err) {
        throw err;
      } else {
        res.render("carrito", {
          cartProducts: results.recordsets[0],
          correoUsuario: crud.corr,
        });
      }
    }
  );
});

router.post("/payInfo", (req, res) => {
  const id_producto = req.body.id_producto;
  const cantidad_producto = req.body.cantidad_producto;
  console.log(id_producto, cantidad_producto);
  res.render("payInfo", {
    idProducto: id_producto,
    correoUsuario: crud.corr,
    cantidadProducto: cantidad_producto,
  });
});

router.post("/payDone", (req, res) => {
  const id_producto = req.body.id_producto;
  const correo_usuario = req.body.correo_usuario;
  const cantidad_pedido = req.body.cantidad_producto;

  var consulta = `INSERT INTO Pedidos (Id_Producto_Pedido,Correo_Usuario,Cantidad_Pedido,Fecha_Pedido) VALUES ('${id_producto}','${correo_usuario}','${cantidad_pedido}','${fecha}')`;

  request.query(consulta, (err, results) => {
    if (err) {
      throw err;
    } else {
      console.log(fecha);
      setTimeout(() => {
        res.redirect("/");
      }, 1000);
    }
  });
});

router.post("/carrito", (req, res) => {
  const nombre = req.body.nombre;
  const id_producto = req.body.id_producto;
  const cantidad_producto = req.body.cantidad_producto;
  const correo = crud.corr;
  var consulta = `INSERT INTO Carrito (Id_Producto,Nombre_Producto,Cantidad_Producto,Correo_Usuario) VALUES ('${id_producto}','${nombre}','${cantidad_producto}','${correo}')`;
  request.query(consulta, (err, results) => {
    if (err) {
      throw err;
    } else {
      setTimeout(() => {
        res.redirect(req.get("referer"));
      }, 1000);
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

router.get("/mochilas", (req, res) => {
  res.render("mochilas");
});

router.get("/carrito", (req, res) => {
  res.render("carrito");
});

router.get("/payInfo", (req, res) => {
  res.render("payInfo");
});
router.get("/orders", (req, res) => {
  res.render("orders");
});
const crud = require("./controllers/crud");
const { fechaConvertida, fecha } = require("./public/js/actualTime");
const { partirFecha } = require("./public/js/sliceDate");
router.post("/save", crud.save);
router.get("/edit/:id", crud.edit);
router.post("/update", crud.update);
router.get("/delete/:id", crud.delete);
router.get("/deletePedido/:id", crud.deletePedido);
router.get("/deleteCartProduct/:id", crud.deleteCartProduct);
router.get("/productPage/:id", crud.productPage);
router.post("/register", crud.register);
router.get("/indexCategory/:id", crud.indexCategory);
// router.post("/payDone", crud.payDone);

router.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

//Ruta iniciar sesión
router.post("/auth", crud.authUser);
router.get("/login", crud.login);
router.get("/logout", crud.logout);
router.get("/", crud.home);

module.exports = router;
