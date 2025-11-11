const Product = require('../models/Product');

class productsService {
  constructor() {}

  async create(data) {
    const product = new Product(data);
    await product.save();
    return product.toObject();
  }

  async getAll() {
    return Product.find().lean();
  }

  async getById(id) {
    return Product.findById(id).lean();
  }

  async update(id, changes) {
    const updated = await Product.findByIdAndUpdate(id, changes, { new: true }).lean();
    if (!updated) throw new Error('Product Not Found');
    return updated;
  }

  async delete(id) {
    const deleted = await Product.findByIdAndDelete(id).lean();
    if (!deleted) throw new Error('Product Not Found');
    return { id };
  }
}

module.exports = productsService;

/*
1. Procesar Solicitudes. Permiten manipular las solicitudes de entrada antes de que 
   lleguen a los manejadores de rutas.

2. Respuesta: Pueden modificar las respuestas antes de que envien de vuelta al cliente.

3. Encadenar tareas: Permiten encadenar una serie de funciones que se ejeuctan en
   orden, cada una de las cuales puede realizar una tearea específica.

4. Control de flujo: Permite determinar si se debe continuar con el siguiente 
   middleware o manejador de ruta, o si se debe cortar la cadena de middlewares.

function (req, res, next) {
  if (something){
  res.send('end);
  } else {
    next();
  }
} 
*/

