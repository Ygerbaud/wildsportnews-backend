const ArticlesRouter = require('express').Router();

const Article = require('../models/articles');


// Récupération de tous les articles
ArticlesRouter.get('/',  (req, res) => {
  Article.findMany()
    .then((articles) => {
      res.status(200).json(articles.rows);
    })
    .catch((err) => {
      console.log(err);
      res.status(401).send('Error retrieving articles from databases');
    });
});
// Récupération des catégories
ArticlesRouter.get('/categories', (req, res) => {
  Article.findCategories()
    .then((articles) => {
      res.json(articles.rows);
    })
    .catch((err) => {
      console.log(err);
      res.status(401).send('Error retrieving categories from databases');
    });
});

// Récupération d'un seul Article
ArticlesRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  Article.findOne(id)
    .then((articles) => {
      res.json(articles.rows);
    })
    .catch((err) => {
      res.status(401).send('Error retrieving article from databases');
    });
});



module.exports = ArticlesRouter;
