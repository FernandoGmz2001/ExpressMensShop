const conexion = require("../database/db");
const sql = require("mssql");
var request = new sql.Request();

// exports.save = (req, res) => {
//   let data = {Nombre:req.body.nombre,Precio:req.body.precio,Peso:req.body.peso,Descripcion:req.body.descripcion,Imagen:req.body.imagen,Categoria:req.body.categoria,Cantidad:req.body.cantidad,NombreCategoria:req.body.nombreCategoria}
//   let consulta = 'INSERT INTO Productos SET ?'


//   request.query(consulta,data,function(err,results){
//     if(err){
//       throw err
//     }else{
//       res.redirect('/dashboard')
//     }
//   })
  
// };
