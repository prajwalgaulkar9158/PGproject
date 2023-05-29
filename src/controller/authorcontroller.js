const authorModel = require("../model/authorModel");
const jwt = require("jsonwebtoken");
const emailValidator = require('email-validator');
const passwordValidator = require("password-validator");

// Validate the email format
function validateEmail(email) {
  return emailValidator.validate(email);
}

// Validate the password length
function validatePassword(password) {
  const schema = new passwordValidator();
  schema.is().min(8);
  return schema.validate(password);
}

// Create a new author
const author = async function (req, res) {
  const { fname, email, password } = req.body;

  try {
    // Validate email
    if (!validateEmail(email)) {
      return res.status(400).send({ status: false, msg: "Invalid email" });
    }

    // Validate password
    if (!validatePassword(password)) {
      return res.status(400).send({ status: false, msg: "Minimum length of password should be 8 characters" });
    }

    const authorData = { fname, email, password };
    const createAuthor = await authorModel.create(authorData);
    res.status(201).send({ status: true, data: createAuthor });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ status: false, msg: err.message });
  }
};

module.exports.author = author;

// Author login
const loginAuthor = async function (req, res) {
  const { email, password } = req.body;

  try {
    // Validate email
    if (!validateEmail(email)) {
      return res.status(400).send({ status: false, msg: "Invalid email" });
    }

    // Validate password
    if (!validatePassword(password)) {
      return res.status(400).send({ status: false, msg: "Minimum length of password should be 8 characters" });
    }

    const validAuthor = await authorModel.findOne({ email, password });

    if (!validAuthor) {
      res.status(401).send({ status: false, msg: "Author not found" });
    } else {
      const token = jwt.sign(
        {
          userEmail: email,
          userId: validAuthor._id.toString(),
        },
        "signature of group-5"
      );
      res.status(201).send({ status: true, data: token });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: false, error: err });
  }
};

module.exports.loginAuthor = loginAuthor;
