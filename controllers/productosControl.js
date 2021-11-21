const { listaProductos } = require('../productos') //trae el array de productos

exports.productoControl = (req,res) => {
         try { //manejo de errores para la devolucion de la lista de productos
           res.status(200).json({ //si todo va bien retorna la lista de productos en response
               productos: listaProductos  
           })
         } catch(error) {
             console.log(error);

         }
   
   }
   