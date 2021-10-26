const { listaProductos } = require('../productos')

exports.productoControl = (req,res) => {
         try {
           res.status(200).json({
               productos: listaProductos
           })
         } catch(error) {
             console.log(error);

         }
   
   }
   