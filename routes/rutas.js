const productsRouter = require('./productsRouter');
const usersRouter = require('./usersRouter');
const categoriesRouter = require('./categoriesRouter');
const brandsRouter = require('./brandsRouter');
const moviesRouter = require('./moviesRouter');

function routerApi(app) {
    app.use('/products', productsRouter);
    app.use('/users', usersRouter);
    app.use('/categories', categoriesRouter);
    app.use('/movies', moviesRouter);
    app.use('/brands', brandsRouter);
}

module.exports = routerApi;