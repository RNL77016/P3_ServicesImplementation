const productsService = require('./productsService');
const categoriesService = require('./categoriesService');
const brandsService = require('./brandsService');
const usersService = require('./usersService');

module.exports = {
  productsService: new productsService(),
  categoriesService: new categoriesService(),
  brandsService: new brandsService(),
  usersService: new usersService(),
};
