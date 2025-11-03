const faker = require('faker');

class productsService {
  constructor(){
    this.products = [];
    this.generate();
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  generate(){
    for (let i = 0; i < 20; i++) {
      this.products.push({
          id: i + 1,
          image: faker.image.imageUrl(),
          productName: faker.commerce.productName(),
          description: faker.lorem.paragraph(),
          price: parseInt(faker.commerce.price(), 10),
          stock: faker.datatype.number({ min: 0, max: 100 }),
          categoryId: faker.datatype.number({ min: 1, max: 5 }),
          brandId: faker.datatype.number({ min: 1, max: 5 })
      });
    }
  }

  async create(data){
    const newProduct = {
      id: this.products.length + 1,
      ...data
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async getAll(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 1000);
    })
  }

 
  async getById(id){
    return this.products.find(item => item.id == id);
  }


  async update(id, changes){
    const index = this.products.findIndex(item => item.id == id);
    if (index === -1) {
      throw new Error('Product Not Found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product, 
      ...changes 
    };
    return this.products[index];
  }

  async delete(id){
    const index = this.products.findIndex(item => item.id == id);
    if (index === -1) {
      throw new Error('Product Not Found');
    }
    this.products.splice(index, 1);
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

