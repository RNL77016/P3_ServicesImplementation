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

  create(data){
    const newProduct = {
      id: this.products.length + 1,
      ...data
    };
    this.products.push(newProduct);
    return newProduct;
  }

  getAll(){
    return this.products;
  }

  getById(id){
    return this.products.find(item => item.id == id);
  }

  update(id, changes){
    const index = this.products.findIndex(item => item.id == id);
    if (index === -1) {
      throw new Error('Product Not Found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product, //Con esto mantenemos las propiedades del producto
      ...changes // y asi no se borra todo, solo se cambia la propiedad actualizada
    };
    return this.products[index];
  }

  delete(id){
    const index = this.products.findIndex(item => item.id == id);
    if (index === -1) {
      throw new Error('Product Not Found');
    }
    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = productsService;



