const pool = require("../db-config");

/**
 * Récupération de tous les articles
 */
const findMany = () => {
  return pool.query("SELECT articles.id,titre,resume,textcomplet,image,name FROM articles INNER JOIN categories ON articles.categorie_id=categories.id").then((results) => results);
};

/**
 * Récupération de tous les catégories
 */
const findCategories = () => {
  return pool.query("SELECT * FROM categories ").then((results) => results);
};

/**
 * Récupération d'un seul Article'
 */
const findOne = (id) => {
  return pool
    .query("SELECT articles.id,titre,resume,textcomplet,image,name FROM articles INNER JOIN categories ON articles.categorie_id=categories.id WHERE articles.id = $1", [id])
    .then((results) => results);
};



/**
 *Suppression d'un Article'
 */
 const deleteOne = (id) => {
  return pool
    .query('DELETE FROM articles WHERE id = $1', [id])
    .then(() => 'Report deleter successfully');
};
module.exports = {
  findMany,
  findOne,
  findCategories,
  deleteOne
};
