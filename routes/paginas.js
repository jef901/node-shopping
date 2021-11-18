const express = require("express");
const { principalControl,carritoControl } = require("../controllers/paginasControl");

const router = express.Router();

router.get("/",principalControl); //lleva a la pagina index
router.get("/carrito",carritoControl); //lleva a la pagina carrito



module.exports = router; //se exporta el ruteo para que pueda ser accedido externamente