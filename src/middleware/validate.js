const express = require("express");
const emailValidator = require("email-validator");
const passwordValidator = require("password-validator");
const mongoose = require("mongoose");
const authorModel = require("../model/authorModel");
const blogModel = require("../model/blogModel");

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

const isValidBody = function (data) {
  return Object.keys(data).length > 0;
};

const isValidId = function (data) {
  return mongoose.Types.ObjectId.isValid(data);
};

const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;

const isValidName = (name) => {
  return nameRegex.test(name);
};

//================================LOGIN VALIDATION ================================================
function validateLogin(req, res, next) {
  const { email, password } = req.body;
  const isValidEmail = validateEmail(email);
  const isValidPassword = validatePassword(password);

  if (!isValidEmail) {
    return res.status(400).json({ status: false, msg: "Invalid email" });
  }

  if (!isValidPassword) {
    return res
      .status(400)
      .json({ status: false, msg: "Invalid password" });
  }

  next();
}

//======================================AUTHOR ================================================
const validateAuthor = async (req, res, next) => {
  const { fname, lname, title, email, password } = req.body;
  const errors = [];

  if (!isValidBody(req.body)) {
    return res
      .status(400)
      .json({ status: false, msg: "Body can't be empty" });
  }

  // Check if required fields are present
  if (!fname) {
    errors.push("First name is mandatory");
  } else if (!isValidName(fname)) {
    errors.push("Name doesn't contain valid characters");
  }

  if (!lname) {
    errors.push("Last name is mandatory");
  } else if (!isValidName(lname)) {
    errors.push("Name doesn't contain valid characters");
  }

  if (!title) {
    errors.push("Title is mandatory");
  }

  const validTitles = ["Mr", "Mrs", "Miss"];
  if (title && !validTitles.includes(title)) {
    errors.push("Title must be one of: Mr, Mrs, Miss");
  }

  if (!email) {
    errors.push("Email is mandatory");
  } else if (!validateEmail(email)) {
    errors.push("Invalid email");
  }

  const existingAuthor = await authorModel.findOne({ email });
  if (existingAuthor) {
    return res
      .status(500)
      .send({ status: false, msg: "Email already exists in the database" });
  }

  if (!password) {
    errors.push("Password is mandatory");
  }
  if (!validatePassword(password)) {
    errors.push("Minimum length of password should be 8 characters");
  }

  if (errors.length > 0) {
    return res.status(400).json({ status: false, errors });
  }

  // Validation passed, proceed to the next middleware or route handler
  next();
};

//================================================BLOG===============================================
const validateBlog = async (req, res, next) => {
  const { title, body, authorId, tags, category, subcategory } = req.body;
  const errors = [];

  if (!isValidBody(req.body)) {
    return res
      .status(400)
      .json({ status: false, msg: "Body can't be empty" });
  }

  // Check if required fields are present
  if (!title) {
    errors.push("Title is mandatory");
  }
  if (!body) {
    errors.push("Body is mandatory");
  }
  if (!authorId) {
    errors.push("Author ID is mandatory");
  } else if (!isValidId(authorId)) {
    errors.push("Invalid Author ID");
  }
  if (!category) {
    errors.push("Category is mandatory");
  }
  if (!tags) {
    errors.push("Tags are required");
  }
  if (!subcategory) {
    errors.push("Subcategory is not present");
  }

  // Return errors if any
  if (errors.length > 0) {
    return res.status(400).json({ status: false, errors });
  }

  // Validation passed, proceed to the next middleware or route handler
  next();
};

module.exports = { validateBlog, validateAuthor, validateLogin };
