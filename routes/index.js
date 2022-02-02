
const ArticlesRouter = require('./articles');
const UsersRouter = require('./users');



const setupRoutes = (app) => {
  app.use('/articles', ArticlesRouter)
  app.use('/users', UsersRouter)
}

module.exports = { setupRoutes }