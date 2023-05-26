const authorModel = require("../model/authorModel");
const blogModel = require("../model/blogModel");
const jwt = require("jsonwebtoken");
//====================author creation===============//
const author = async function (req, res) {
  const authorData = req.body;
  const authorEmail = req.body.email;
  const validEmail = /^[a-z0-9_]{3,}@[a-z]{3,}.[a-z]{3,6}$/.test(authorEmail);

  try {
    if (validEmail == true) {
      const createAuthor = await authorModel.create(authorData);
      res.status(201).send({ status: true, data: createAuthor });
    } else {
      res.status(400).send({ status: false, msg: "invalid email" });
    }
  } catch (err) {
    console.log(err);
    if (err.message.includes("validation")) {
      return res.status(400).send({ status: false, msg: err.message });
    } else if (err.message.includes("duplicate")) {
      return res.status(400).send({ status: false, msg: err.message });
    } else {
      res.status(400).send({ status: false, msg: err });
    }
  }
};
module.exports.author = author;

//+++++++++++++++++++++++++++++++  login author  +++++++++++++++++++++++++++++++++++++//

const loginAuthor = async function (req, res) {
  const authorEmail = req.body.email;
  const authorPassword = req.body.password;
  try {
    const validAuthor = await authorModel.findOne({
      $and: [{ email: authorEmail }, { password: authorPassword }],
    });
    console.log(validAuthor);
    if (!validAuthor) {
      res.status(401).send({ status: false, msg: "author not found" });
    } else {
      const token = jwt.sign(
        {
          userEmail: authorEmail,
          userId: validAuthor._id.toString(),
        },
        "signature of group-5"
      );
      res.status(201).send({ status: true, data: token });
    }
  } catch (err) {
    res.status(500).send({ status: false, error: err });
  }
};
module.exports.loginAuthor = loginAuthor;
