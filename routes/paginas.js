const express = require("express");
const { principalControl,carritoControl } = require("../controllers/paginasControl");

const router = express.Router();

router.get("/",principalControl);
router.get("/carrito",carritoControl);



module.exports = router;