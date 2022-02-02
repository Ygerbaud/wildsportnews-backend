const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");

const saltRound = 11;

/**
 * Encryptage du mot de passe avec bcrypt pour l'insérer dans la BDD
 */
const hashedPassword = (req, res, next) => {
  bcrypt
    .hash(req.body.password, saltRound)
    .then((hash) => {
      delete req.body.password;
      req.body = { ...req.body, hashedPassword: hash };
      next();
    })
    .catch(() => {
      res.status(500).send("Error encoding the password");
    });
};

/**
 * création d'un uuid en plus de l'id
 */
const createUuid = (req, res, next) => {
  const uuiduser = uuidv4();
  req.body = { ...req.body, uuiduser };
  next();
};

/**
 * Vérification des inputs par le backend
 */
const checkUserFields = (req, res, next) => {
  const error = Joi.object({
    email: Joi.string().email().presence("required"),
    password: Joi.string()
      .max(255)
      .pattern(
        new RegExp(
          "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?([^ws]|[_])).{8,}$"
        )
      )
      .presence("required"),
    favorite_id: Joi.number().integer(),
  }).validate(req.body, { abortEarly: false }).error;

  if (error) {
    res.status(401).json({ msg: "Fields are not valids" });
  } else {
    next();
  }
};

module.exports = {
  hashedPassword,
  createUuid,
  checkUserFields,
};
