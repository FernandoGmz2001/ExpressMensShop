const conexion = require("../database/db");
const sql = require("mssql");
var request = new sql.Request();
const bcryptjs = require("bcryptjs");

//CRUD PRODUCTOS

//Guardar producto
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

//Actualizar producto
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

//Editar producto
exports.edit = (req, res) => {
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
};

exports.delete = (req, res) => {
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
};

exports.productPage = (req, res) => {
  const id = req.params.id;
  request.query(
    `SELECT * FROM Productos WHERE Id_Producto = '${id}'`,
    (err, results) => {
      if (err) {
        res.render("/");
        throw err;
      } else {
        res.render("productPage", { producto: results.recordset[0] });
      }
    }
  );
};

exports.register = async (req, res) => {
  const nombre = req.body.nombre;
  const apellido_paterno = req.body.apellido_paterno;
  const apellido_materno = req.body.apellido_materno;
  const correo = req.body.correo;
  const contraseña = req.body.contraseña;
  let passwordHaash = await bcryptjs.hash(contraseña, 8);
  request.query(
    `INSERT INTO Usuarios (Nombre,Apellido_Paterno,Apellido_Materno,Correo,Contraseña) VALUES ('${nombre}','${apellido_paterno}','${apellido_materno}','${correo}','${passwordHaash}')`,
    async (error, results) => {
      if (results.lenght > 0) {
        res.render("login", { error: "Usuario existente" });
      } else {
        res.redirect("/login");
      }
      if (error) {
        throw error;
      }
    }
  );
};

exports.authUser = async (req, res) => {
  const correo = req.body.correo;
  const contraseña = req.body.contraseña;
  request.query(
    `SELECT CASE WHEN EXISTS (SELECT Correo FROM Usuarios WHERE Correo= '${correo}')THEN 'TRUE' ELSE 'FALSE' END AS EXISTE`,
    (err, results) => {
      const resultado = results.recordset[0];
      if (resultado.EXISTE == "TRUE") {
        request.query(
          `SELECT * FROM Usuarios WHERE Correo = '${correo}'`,
          async (error, results) => {
            !(await bcryptjs.compare(
              contraseña,
              results.recordset[0].Contraseña,
              (err, isMatch) => {
                if (!isMatch) {
                  res.render("login", {
                    error: "Contraseña incorrecta",
                  });
                } else {
                  req.session.loggedIn = true;
                  req.session.correo = results.recordset[0].Correo;
                  res.redirect("/");
                }
              }
            ));
          }
        );
      } else {
        res.render("login", { error: "Usuario no existente" });
      }
    }
  );
};
//   request.query(async (error, results) => {
//     !(await bcryptjs.compare(
//       contraseña,
//       results.recordset[0].Contraseña,
//       (err, isMatch) => {
//         if (!isMatch) {
//           res.render("login", {
//             error: "Contraseña incorrecta",
//           });
//         } else {
//           req.session.loggedIn = true;
//           req.session.correo = results.recordset[0].Correo;
//           res.redirect("/");
//         }
//       }
//     ));
//   });
// };

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

exports.login = (req, res) => {
  if (req.session.loggedIn != true) {
    res.render("login", { error: "" });
  } else {
    res.redirect("/");
  }
};

exports.home = (req, res) => {
  if (req.session.loggedIn == true) {
    request.query("SELECT * FROM Productos", (err, results) => {
      if (err) {
        throw err;
      } else {
        res.render("index", {
          login: true,
          name: req.session.correo,
          results: results,
        });
      }
    });
  } else {
    res.redirect("/login");
  }
};
