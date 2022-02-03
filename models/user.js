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
const create = ({ email, hashedPassword, uuiduser}) => {
  return pool
    .query(
      'INSERT INTO users (email, hashedPassword, uuiduser) VALUES($1,$2,$3) RETURNING *',
      [email, hashedPassword, uuiduser]
    )
    .then((result) => {
      return { uuiduser};
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
