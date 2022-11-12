const express = require("express");
var bodyParser = require("body-parser");
var app = express();
var cors = require("cors");
const sql = require("mssql");
var request = new sql.Request();
const conexion = require("./database/db");
const session = require("express-session");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", require("./router"));

app.use(cors());

app.use(express.static(__dirname + "/public"));

app.listen(5000, () => {
  console.log("Servidor corriendo en http://localhost:5000");
});

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
