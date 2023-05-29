const authorModel = require("../model/authorModel");
const jwt = require("jsonwebtoken");

// Create a new author
const author = async function (req, res) {
  try {
    const data= req.body;
    const createAuthor = await authorModel.create(data);
    res.status(201).send({ status: true, data: createAuthor });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ status: false, msg: err.message });
  }
};

module.exports.author = author;

// Author login
const loginAuthor = async function (req, res) {
  try {
    const { email, password } = req.body;

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
