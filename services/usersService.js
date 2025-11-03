const faker = require('faker');

class usersService {
  constructor(){
    this.users = [];
    this.generate();
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  generate(){
    for (let i = 0; i < 20; i++) {
      this.users.push({
          id: i + 1,
          name: faker.name.findName(),
          username: faker.internet.userName(),
          password: faker.internet.password()
      });
    }
  }

  async create(data){
    const newUser = {
      id: this.users.length + 1,
      ...data
    };
    this.users.push(newUser);
    return newUser;
  }

  async getAll(){
    return this.users;
  }

  async getById(id){
    return this.users.find(item => item.id == id);
  }

  async update(id, changes){
    const index = this.users.findIndex(item => item.id == id);
    if (index === -1) {
      throw new Error('User Not Found');
    }
    const user = this.users[index];
    this.users[index] = {
      ...user,
      ...changes
    };
    return this.users[index];
  }

  async delete(id){
    const index = this.users.findIndex(item => item.id == id);
    if (index === -1) {
      throw new Error('User Not Found');
    }
    this.users.splice(index, 1);
    return { id };
  }
}

module.exports = usersService;



