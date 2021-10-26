const express = require("express");
const { productoControl } = require("../controllers/productosControl");

const router = express.Router();

router.get("/",productoControl);


module.exports = router;