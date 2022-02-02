const pool = require('../db-config');

/**
 * Récupération du users par l'email dans la BDD
 */
const findOneByEmail = (email) => {
  return pool
    .query('SELECT * FROM users WHERE email = $1', [email])
    .then((result) => result.rows[0]);
};

/**
 * Création d'un nouveau user dans la BDD
 */
const create = ({ email, hashedPassword, uuiduser, favorite_id }) => {
  return pool
    .query(
      'INSERT INTO users (email, hashedPassword, uuiduser,favorite_id) VALUES($1,$2,$3,$4) RETURNING *',
      [email, hashedPassword, uuiduser,favorite_id]
    )
    .then((result) => {
      return { uuiduser,favorite_id };
    });
};


/**
 * Vérification du users dans la BDD avec l'uuid
 */

const isExistingUuiduser = (uuiduser) => {
  return pool
    .query('SELECT * FROM users WHERE uuiduser = $1', [uuiduser])
    .then((result) => result.rows.length > 0);
};



module.exports = {
  findOneByEmail,
  create,
  isExistingUuiduser,
};
