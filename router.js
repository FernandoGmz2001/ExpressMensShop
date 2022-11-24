const express = require("express");
const router = express.Router();
const sql = require("mssql");
const conexion = require("./database/db");
const session = require("express-session");

var request = new sql.Request();

// Mostrar dashboard
router.get("/dashboard", (req, res) => {
  request.query("SELECT * FROM vw_ProductosCategorias1", (err, results) => {
    if (err) {
      throw err;
    } else {
      var consulta = `EXEC sp_CantidadProductos`;
      request.query(consulta, (err, results2) => {
        var consulta2 = `SELECT * FROM Productos WHERE Id_Producto='9'`;
        request.query(consulta2, (err, results3) => {
          // console.log(results3);
          res.render("dashboard", {
            results: results.recordsets[0],
            results2: results2.recordset[0].CantidadProductos,
          });
        });
        // res.render("dashboard", {
        //   results: results.recordsets[0],
        //   results2: results2.recordset[0].CantidadProductos,
        // });
      });
    }
  });
});

router.post("/sendID", (req, res) => {
  const id_producto = req.body.Id;
  var consulta2 = `SELECT * FROM vw_ProductosCategorias1 WHERE Id_Producto='${id_producto}'`;
  console.log(id_producto);
  console.log(consulta2);

  request.query(consulta2, (err, results3) => {
    if (err) {
      throw err;
    } else {
      console.log(results3);
      res.json({ results3: results3.recordset[0] });
    }
  });
});

router.get("/orders", (req, res) => {
  request.query("SELECT * FROM vw_PedidosProductos", (err, results) => {
    if (err) {
      throw err;
    } else {
      res.render("orders", {
        results: results.recordsets[0],
      });
    }
  });
});

router.get("/countMonthSells", (req, res) => {
  var consulta = "EXEC ContarVentas";
  request.query(consulta, (err, results) => {
    if (err) {
      throw err;
    } else {
      res.redirect(req.get("referer"));
    }
  });
});

router.post("/payInfo", (req, res) => {
  const id_producto = req.body.id_producto;
  const cantidad_producto = req.body.cantidad_producto;
  console.log(
    `id_producto: ${id_producto}`,
    `cantidad_producto: ${cantidad_producto}`
  );
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

  var conocerIdUsuario = `SELECT Id_Usuario FROM Usuarios WHERE Correo = '${correo_usuario}'`;
  request.query(conocerIdUsuario, (err, idUsuarioDevuelto) => {
    if (err) {
      throw err;
    } else {
      const idUsuarioEncontrado = idUsuarioDevuelto.recordset[0].Id_Usuario;
      var consulta = `INSERT INTO Pedidos (Id_Producto_Pedido,Correo_Usuario,Cantidad_Pedido,Fecha_Pedido,Id_Usuario) VALUES ('${id_producto}','${correo_usuario}','${cantidad_pedido}','${fecha}','${idUsuarioEncontrado}')`;
      var consulta2 = `DELETE FROM Carrito Where Id_Producto = '${id_producto}'`;
      request.query(consulta, (err, results) => {
        if (err) {
          throw err;
        } else {
          request.query(consulta2, (err, results) => {
            if (err) {
              throw err;
            } else {
              setTimeout(() => {
                res.redirect("/");
              }, 1000);
            }
          });
        }
      });
    }
  });
});

router.get("/storedProcedures", (req, res) => {
  var consulta = "EXEC ContarVentas";
  request.query(consulta, (err, results) => {
    if (err) {
      throw err;
    } else {
      res.render("storedProcedures", {
        results: results.recordset[0].VentasTotales,
        results2: "",
      });
      let dateInput = req.body.dateInput;
    }
  });
});

router.post("/storedProcedures", (req, res) => {
  var consulta = "EXEC ContarVentas";
  request.query(consulta, (err, results) => {
    if (err) {
      throw err;
    } else {
      let dateInput = req.body.dateInput;
      var consulta2 = `EXEC PedidosEnFecha @FechaPedido = '${dateInput}'`;
      request.query(consulta2, (err, results2) => {
        if (err) {
          throw err;
        } else {
          if (results2.recordset[0].VentasEnUnaFecha == "0") {
            res.render("storedProcedures", {
              results: results.recordset[0].VentasTotales,
              results2: "0",
            });
          } else {
            res.render("storedProcedures", {
              results: results.recordset[0].VentasTotales,
              results2: results2.recordset[0].VentasEnUnaFecha,
            });
          }
        }
      });
    }
  });
});

router.post("/carrito", (req, res) => {
  const nombre = req.body.nombre;
  const id_producto = req.body.id_producto;
  const cantidad_producto = req.body.cantidad_producto;
  const imagen = req.body.imagen_producto;
  const precio = req.body.precio_producto;
  const correo = crud.corr;
  var consulta = `INSERT INTO Carrito (Id_Producto,Nombre_Producto,Cantidad_Producto,Correo_Usuario,Imagen_Producto,Precio_Producto) VALUES ('${id_producto}','${nombre}','${cantidad_producto}','${correo}','${imagen}','${precio}')`;
  request.query(consulta, (err, results) => {
    if (err) {
      throw err;
    } else {
      setTimeout(() => {
        // res.render("carrito")
        res.redirect(req.get("referer"));
      }, 1000);
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

router.get("/storedProcedures", (req, res) => {
  res.render("storedProcedures");
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
router.get("/account", (req, res) => {
  var consulta = `SELECT * FROM Usuarios WHERE Correo = '${crud.corr}'`;
  request.query(consulta, (err, results) => {
    if (err) {
      throw err;
    } else {
      const Usuario = results.recordset[0];
      console.log(`$Usuario linea 245`);

      let Nombre = Usuario.Nombre;
      let Correo = Usuario.Correo;
      let Puntos = Usuario.Puntos;
      res.render("account", {
        Nombre: Nombre,
        Correo: Correo,
        Puntos: Puntos,
      });
    }
  });
});

const crud = require("./controllers/crud");
const { fechaConvertida, fecha } = require("./public/js/actualTime");
const { partirFecha } = require("./public/js/sliceDate");
router.post("/save", crud.save);
router.get("/edit/:id", crud.edit);
router.post("/update", crud.update);
router.get("/delete/:id", crud.delete);
router.get("/deletePedido/:id", crud.deletePedido);
router.get("/deleteUser/:id", crud.deleteUser);
router.get("/deleteCartProduct/:id", crud.deleteCartProduct);
router.get("/productPage/:id", crud.productPage);
router.post("/register", crud.register);
// router.get("/account", crud.showAccount);
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
