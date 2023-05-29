const jwt = require("jsonwebtoken");
const authorModel = require("../model/authorModel");
const blogModel = require("../model/blogModel");

//==============================AUTHENTICATION============================================

const authentication = async function (req, res, next) {
  const authorHeader = req.headers["x-api-key"];
  try {
    if (!authorHeader) {
      res.status(400).send({ status: false, msg: "Token is not present" });
    } else {
      const decodedToken = await jwt.verify(
        authorHeader,
        "signature of group-5",
        function (err, decodedToken) {
          if (err)
            res
              .status(401)
              .send({ status: false, msg: "authentication failed" });

          next();
        }
      );
    }
  } catch (err) {
    res.status(500).send({ status: false, msg: err });
  }
};

//===========================================AUTHORISATION=======================================

const authorisation = async function (req, res, next) {
  try {
    const headerToken = req.headers["x-api-key"];
    const blog_id = req.params.blogId;
    if (!blog_id) return res.status(400).send("blog id is required");

    const decodedToken = await jwt.verify(headerToken, "signature of group-5");
    const author_id = decodedToken.userId;

    const blog = await blogModel.findById(blog_id);

    if (!blog)
      res.status(404).send({ status: false, msg: "No blogs with this id" });

    if (blog.authorId == author_id) {
      next();
    } else {
      res
        .status(403)
        .send({
          status: false,
          msg: "Not authorized to perform this operation",
        });
    }
  } catch (err) {
    res.status(500).send({ status: false, msg: err });
  }
};

module.exports = { authorisation, authentication };
