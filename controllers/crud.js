const conexion = require("../database/db");
const sql = require("mssql");
var request = new sql.Request();
const bcryptjs = require("bcryptjs");
const session = require("express-session");
const Swal = require("sweetalert2");
//CRUD PRODUCTOS

//Guardar producto
exports.save = (req, res) => {
  const nombre = req.body.nombre;
  const precio = req.body.precio;
  const peso = req.body.peso;
  const descripcion = req.body.descripcion;
  const imagen = req.body.imagen;
  const categoria = req.body.id_categoria;
  const cantidad = req.body.cantidad;
  const grosor = req.body.grosor;
  const material = req.body.material;
  const costo_puntos = req.body.costo_puntos;
  const valor_puntos = req.body.valor_puntos;
  const id_proveedor = req.body.id_proveedor;
  const marca = req.body.marca;

  var consulta = `INSERT INTO Productos (Nombre,Precio,Peso,Descripcion,Imagen,Id_Categoria,Cantidad,Grosor,Material,Costo_Puntos,Valor_Puntos,Id_Proveedor,Marca) VALUES ('${nombre}','${precio}','${peso}','${descripcion}','${imagen}','${categoria}','${cantidad}','${grosor}','${material}','${costo_puntos}','${valor_puntos}','${id_proveedor}','${marca}')`;

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
  const categoria = req.body.id_categoria;
  const cantidad = req.body.cantidad;
  const grosor = req.body.grosor;
  const material = req.body.material;
  const costo_puntos = req.body.costo_puntos;
  const valor_puntos = req.body.valor_puntos;
  const id_proveedor = req.body.id_proveedor;
  const marca = req.body.marca;

  var consulta = `UPDATE Productos SET Nombre='${nombre}',Precio='${precio}',Peso='${peso}',Descripcion='${descripcion}',Imagen='${imagen}',Id_Categoria='${categoria}',Cantidad='${cantidad}',Grosor='${grosor}',Material='${material}',Costo_Puntos='${costo_puntos}',Valor_Puntos='${valor_puntos}',Id_Proveedor='${id_proveedor}',Marca='${marca}' WHERE Id_Producto = '${id}'`;

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
  var consulta = `SELECT * FROM Productos WHERE Id_Producto='${id}'`;
  request.query(consulta, (err, results) => {
    if (err) {
      throw err;
    } else {
      res.render("edit", { producto: results.recordset[0] });
    }
  });
};

//Eliminar producto
exports.delete = (req, res) => {
  const id = req.params.id;
  var consulta = `DELETE FROM Productos WHERE Id_Producto = '${id}'`;
  request.query(consulta, (err, results) => {
    if (err) {
      throw err;
    } else {
      res.redirect("/dashboard");
    }
  });
};

//Mostrar página de producto
exports.productPage = (req, res) => {
  const id = req.params.id;
  var consulta = `SELECT * FROM Productos WHERE Id_Producto = '${id}'`;
  request.query(consulta, (err, results) => {
    if (err) {
      res.render("/");
      throw err;
    } else {
      res.render("productPage", {
        producto: results.recordset[0],
      });
    }
  });
};

//Mostrar página con categoria filtrada
exports.indexCategory = (req, res) => {
  const category = req.params.id;
  var consulta = `SELECT * FROM vw_ProductosCategorias1 WHERE Nombre_Categoria = '${category}'`;
  request.query(consulta, (err, results) => {
    if (err) {
      res.render("/");
      throw err;
    } else {
      var consulta2 = "SELECT Nombre_Categoria FROM Categorias";
      request.query(consulta2, (err, answer) => {
        if (err) {
          throw err;
        } else {
          res.render("indexCategory", {
            categorias: answer.recordset,
            results: results.recordsets[0],
            currentCategory: category,
          });
        }
      });
    }
  });
};

//Formulario para registrar productos
exports.register = async (req, res) => {
  const nombre = req.body.nombre;
  const apellido_paterno = req.body.apellido_paterno;
  const apellido_materno = req.body.apellido_materno;
  const correo = req.body.correo;
  const contraseña = req.body.contraseña;
  let passwordHaash = await bcryptjs.hash(contraseña, 8);

  var consulta = `INSERT INTO Usuarios (Nombre,Apellido_Paterno,Apellido_Materno,Correo,Contraseña) VALUES ('${nombre}','${apellido_paterno}','${apellido_materno}','${correo}','${passwordHaash}')`;
  request.query(consulta, async (error, results) => {
    if (results.lenght > 0) {
      res.render("login", { error: "Usuario existente" });
    } else {
      res.redirect("/login");
    }
    if (error) {
      throw error;
    }
  });
};

//Validación si el usuario existe
exports.authUser = async (req, res) => {
  const correo = req.body.correo;
  const contraseña = req.body.contraseña;
  exports.corr = correo;

  var validarCorreo = `SELECT CASE WHEN EXISTS (SELECT Correo FROM Usuarios WHERE Correo= '${correo}')THEN 'TRUE' ELSE 'FALSE' END AS EXISTE`;
  var validarContraseña = `SELECT * FROM Usuarios WHERE Correo = '${correo}'`;
  request.query(validarCorreo, (err, results) => {
    const resultado = results.recordset[0];
    if (resultado.EXISTE == "TRUE") {
      request.query(validarContraseña, async (error, results) => {
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
      });
    } else {
      res.render("login", { error: "Usuario no existente" });
    }
  });
};

//Destruir la sesión actual
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

//Iniciar sesión
exports.login = (req, res) => {
  if (req.session.loggedIn != true) {
    res.render("login", { error: "" });
  } else {
    res.redirect("/");
  }
};

//Si la sesión es correcta redirigir al menú principal
exports.home = (req, res) => {
  var consulta = "SELECT * FROM Productos";
  if (req.session.loggedIn == true) {
    request.query(consulta, (err, results) => {
      if (err) {
        throw err;
      } else {
        var consulta2 = "SELECT Nombre_Categoria FROM Categorias";
        request.query(consulta2, (err, answer) => {
          if (err) {
            throw err;
          } else {
            res.render("index", {
              categorias: answer.recordset,
              login: true,
              name: req.session.correo,
              results: results.recordsets[0],
            });
          }
        });
      }
    });
  } else {
    res.redirect("/login");
  }
};

exports.deleteCartProduct = (req, res) => {
  const id = req.params.id;
  var consulta = `DELETE FROM Carrito WHERE Id_Carrito = '${id}'`;
  request.query(consulta, (err, results) => {
    if (err) {
      throw err;
    } else {
      res.redirect("/carrito");
    }
  });
};

exports.deletePedido = (req, res) => {
  const id = req.params.id;
  var consulta = `DELETE FROM Pedidos WHERE Id_Pedido = '${id}'`;
  request.query(consulta, (err, results) => {
    if (err) {
      throw err;
    } else {
      res.redirect("/orders");
    }
  });
};
