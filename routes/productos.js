const express = require("express");
const { productoControl } = require("../controllers/productosControl"); //se importa el controlador

const router = express.Router();

router.get("/",productoControl); //llama al controlador de la ruta


module.exports = router;