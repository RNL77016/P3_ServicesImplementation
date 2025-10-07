const faker = require('faker');

class categoriesService {
  constructor(){
    this.categories = [];
    this.generate();
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  generate(){
    for (let i = 0; i < 20; i++) {
      this.categories.push({
          id: i + 1,
          categoryName: faker.commerce.department(),
          description: faker.lorem.paragraph(),
          active: faker.datatype.boolean()
      });
    }
  }

  create(data){
    const newCategory = {
      id: this.categories.length + 1,
      ...data
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  getAll(){
    return this.categories;
  }

  getById(id){
    return this.categories.find(item => item.id == id);
  }

  update(id, changes){
    const index = this.categories.findIndex(item => item.id == id);
    if (index === -1) {
      throw new Error('Category Not Found');
    }
    const category = this.categories[index];
    this.categories[index] = {
      ...category,
      ...changes
    };
    return this.categories[index];
  }

  delete(id){
    const index = this.categories.findIndex(item => item.id == id);
    if (index === -1) {
      throw new Error('Category Not Found');
    }
    this.categories.splice(index, 1);
    return { id };
  }
}

module.exports = categoriesService;