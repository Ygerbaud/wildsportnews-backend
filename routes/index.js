
const ArticlesRouter = require('./articles');
const UsersRouter = require('./users');
const authRouter = require('./auth');



const setupRoutes = (app) => {
  app.use('/auth', authRouter)
  app.use('/articles', ArticlesRouter)
  app.use('/users', UsersRouter)
}

module.exports = { setupRoutes }