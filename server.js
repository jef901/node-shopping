const express = require("express");
const path = require("path")

const app = express();

const directorioPublico = path.join(__dirname,'./public');

app.use(express.static(directorioPublico));

app.set("view engine","hbs")

/*
app.get("/",(req,res)=>{
    res.render("index");
})

app.get("/carrito",(req,res)=>{
    res.render("carrito");
})
*/

app.use("/",require("./routes/paginas"))
app.use("/productos",require("./routes/productos"))



app.listen(5000,()=>{
    console.log("server is running on port 5000")
})