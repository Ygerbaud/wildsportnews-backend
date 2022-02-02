
const ArticlesRouter = require('./articles');



const setupRoutes = (app) => {
  app.use('/articles', ArticlesRouter)
}

module.exports = { setupRoutes }