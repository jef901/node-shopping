const express = require("express");
const { productoControl } = require("../controllers/productosControl");

const router = express.Router();

router.get("/",productoControl); //llama al controlador de la ruta


module.exports = router;