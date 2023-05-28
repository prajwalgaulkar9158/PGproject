const jwt = require("jsonwebtoken");
const authorModel = require("../model/authorModel");
const blogModel = require("../model/blogModel");

const authantication = async function (req, res, next) {
  const authorHeader = req.headers["x-api-key"];
  try {
    if (!authorHeader) {
      res.status(400).send({ status: false, msg: "Token is not present" });
    } else {
      const decoededToken = await jwt.verify(
        authorHeader,
        "signature of group-5",
        function (err, decoededToken) {
          if (err)
            res.status(401).send({ status: false, msg: "not authanticate" });
          next();
        }
      );
    }
  } catch (err) {
    res.status(500).send({ status: false, msg: err });
  }
};
module.exports.authantication = authantication;

///////////////////////// authorisation  ///////////////////////////////

const authorisation = async function (req, res, next) {
  const headerToken = req.headers["x-api-key"];
  const blog_id = req.params.blogId;

  const decoededToken = await jwt.verify(headerToken, "signature of group-5");
  const author_id = decoededToken.userId;

  const blog = await blogModel.findById(blog_id);


  
  try {
    if (!blog) 
      res.status(404).send({ status: false, msg: "invalid path" });
     else {
      if (blog.authorId == author_id) {
        next();
      } else 
        res.status(403).send({ status: false, msg: "not authorised" });
      
    }
  } catch (err) {
    res.status(500).send({ status: false, msg: err });
  }
};
module.exports.authorisation = authorisation;
