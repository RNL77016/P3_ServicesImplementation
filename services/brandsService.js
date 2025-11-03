const faker = require('faker');

class brandsService {
  constructor(){
    this.brands = [];
    this.generate();
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  generate(){
    for (let i = 0; i < 20; i++) {
      this.brands.push({
          id: i + 1,
          brandName: faker.company.companyName(),
          description: faker.lorem.paragraph(),
          active: faker.datatype.boolean()
      });
    }
  }

  async create(data){
    const newBrand = {
      id: this.brands.length + 1,
      ...data
    };
    this.brands.push(newBrand);
    return newBrand;
  }

  async getAll(){
    return this.brands;
  }

  async getById(id){
    return this.brands.find(item => item.id == id);
  }

  async update(id, changes){
    const index = this.brands.findIndex(item => item.id == id);
    if (index === -1) {
      throw new Error('Brand Not Found');
    }
    const brand = this.brands[index];
    this.brands[index] = {
      ...brand,
      ...changes
    };
    return this.brands[index];
  }

  async delete(id){
    const index = this.brands.findIndex(item => item.id == id);
    if (index === -1) {
      throw new Error('Brand Not Found');
    }
    this.brands.splice(index, 1);
    return { id };
  }
}

module.exports = brandsService;


