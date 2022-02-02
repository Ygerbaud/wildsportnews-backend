const pool = require("../db-config");

const findMany = () => {
  return pool.query("SELECT * FROM articles ").then((results) => results);
};

/**
 * récupération de tous les catégories
 */
const findCategories = () => {
  return pool.query("SELECT * FROM categories ").then((results) => results);
};

/**
 * récupération d'un seul Article'
 */
const findOne = (id) => {
  return pool
    .query("SELECT * FROM articles WHERE id = $1", [id])
    .then((results) => results);
};

module.exports = {
  findMany,
  findOne,
  findCategories,
};
