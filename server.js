//backend
const express = require("express");
const path = require("path")

const app = express();

const directorioPublico = path.join(__dirname,'./public');

app.use(express.static(directorioPublico)); // le decimos a node.js donde van a estar la base de la app

app.set("view engine","hbs")  //usamos handlebars como templante

/*
app.get("/",(req,res)=>{
    res.render("index");
})

app.get("/carrito",(req,res)=>{
    res.render("carrito");
})
*/
//middleware deriba resolucion de rutas al directorio routes
app.use("/",require("./routes/paginas"))
app.use("/productos",require("./routes/productos")) //cuando llamamos procutos vamos a la ruta productos



app.listen(5000,()=>{
    console.log("server is running on port 5000")
})