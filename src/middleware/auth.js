const jwt = require("jsonwebtoken");
const blogModel = require("../model/blogModel");
const validation = require("../validations/validators");

const authntication = async (req, res, next) => {
  try {
    let token = req.headers["x-api-key"];
    if (!token) {
      return res
        .status(400)
        .send({ status: false, msg: "token is not present in headres" });
    }
    let decodedToken = jwt.verify(token, "Project-1", (err, author) => {
      if (err) {
        return res
          .status(400)
          .send({ status: false, msg: "failed authentication" });
      }
      req.decodedToken = decodedToken;
    });
    next();
  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};

const authorization = async (req, res, next) => {
  try {
    let userLoggedIn = req.decodedToken.authorId;
    let blogId = req.params.blogId;
    if (!validation.isValidObjectId(blogId)) {
      res.status(400).send({ status: false, msg: "Please Enter valid BlogID" });
    }
    let checkBlog = await blogModel.findById(blogId);
    if (!checkBlog) {
      return res.status(404).send({ status: false, message: "Book not Found" });
    }
    if (checkBlog.authorId !== userLoggedIn) {
      return res.status(400).send({
        status: false,
        msg: "Loggedin user not allowed to modify changes",
      });
    }
    next();
  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};

module.exports = {authntication,authorization};