const jwt = require("jsonwebtoken");
const authorModel = require("../model/authorModel");
const blogModel = require("../model/blogModel");

//==============================AUTHENTICATION============================================

const authentication = async function (req, res, next) {
  const authorHeader = req.headers["x-api-key"];
  try {
    if (!authorHeader) {
     return  res.status(401).send({ status: false, msg: "Token is not present" });
    } else {
      const decodedtoken = await jwt.verify(
        authorHeader,
        "signature of group-5",
        function (err, decodedToken) {
          req.tokenId= decodedToken.userId

          if (err)
            return res
              .status(401)
              .send({ status: false, msg: "authentication failed" });
         return next();
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
    if (!blog_id) return res.status(400).send({status:false,msg:"blog Id required"});

    const decodedToken = await jwt.verify(headerToken, "signature of group-5");
    const author_id = decodedToken.userId;

    const blog = await blogModel.findById(blog_id);

    if (!blog)
       return res.status(404).send({ status: false, msg: "No blogs with this id" });

    if (blog.authorId == author_id) {
      return next();
    } else {
      return res
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

const 
authQuery = async function (req, res, next) {
  try {
    const qparam = req.query;
    if (Object.keys(qparam).length === 0) {
      return res.status(400).send({ msg: "No query found to delete the blog" });
    }
    const blogIdOfSearchedDoc = await blogModel
      .find({$and:[{authorId:req.tokenId},{$or:[...Object.entries(qparam).map(([key, value]) => ({ [key]: value }))]},{isDeleted:false}]})
    if (blogIdOfSearchedDoc.length == 0)
      return res
        .status(403)
        .send({ status: false, msg: "(Unauthorised) blog not found for this Author and or Query" });
   

    
    next();
  } catch (err) {
    res.status(500).send({ status: false, msg: err });
  }
};

module.exports = { authorisation, authentication ,authQuery};
