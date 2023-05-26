const mongoose = require("mongoose");
const authorModel = require("../model/authorModel");
const blogModel = require("../model/blogModel");


const createBlog = async function (req, res) {
  const blogDocument = req.body;
  const authorId = req.body.authorId;

  let validAuthor = await authorModel.findById(authorId);

  try {
    if (!validAuthor) {
      return res.status(400).send({ status: false, msg: "not valid" });
    } else {
      let postBlog = await blogModel.create(blogDocument);

      return res.status(201).send({ status: true, data: postBlog });
    }
  } catch (err) {
     return res.status(500).send({ status: false, error: err })
  }
};

module.exports.createBlog = createBlog
// ====================================================================================

const getBlogs = async function (req, res) {

  const qparam = req.query


  try {
    const getdata = await blogModel.find({ $and: [qparam, { isDeleted: false }, { isPublished: true }] })
    if (!getdata) {
      res.status(400).send({ status: false, msg: "blog not found" })
    }
    res.status(200).send({ status: true, data: getdata })

  } catch (err) {
    res.status(500).send({ status: false, msg: err })
  }

}
module.exports.getBlogs = getBlogs


//=====================================================================//

const updateBlog = async function (req, res) {
  const blogId = req.params.blogId
  const newbody = req.body.body
  const newTag = req.body.tags
  const newTitle = req.body.title
  const newsubcategory = req.body.subcategory


  const updatedata = await blogModel.findOneAndUpdate({ _id: blogId }, {
    publishedAt: new Date, isPublished: true,
    body: newbody, title: newTitle, $push: { tags: newTag, subcategory: newsubcategory }
  }, { new: true })

  if (!updatedata) {
    res.status(404).send({ status: false, msg: "Blog Not Found" })
  } else {

    res.status(201).send({ status: true, data: updatedata })

  }

}
module.exports.updateBlog = updateBlog


//================================//

const deleteBlog = async function (req, res) {
  const blog_id = req.params.blogId
  try {
    const blog = await blogModel.findOneAndUpdate({ _id: blog_id }, { $set: { isDeleted: true, deletedAt: new Date } })
    if (!blog) {
      res.status(404).send({ status: false, msg: "blog not found" })
    } else {
      res.status(200).send({ status: true })
    }

  } catch (err) {
    res.status(500).send({ status: false, error: err })
  }

}
module.exports.deleteBlog = deleteBlog
//==========================================================//

const deleteByQuery = async (req, res) => {
  try {

    const data = req.query;
    const op = await blogModel.updateMany(data, { $set: { isDeleted: true, deletedAt: new Date } });


    if (op.modifiedCount > 0) {
      return res.status(200).send({ msg: "Documents deleted" });
    } else {
      return res.status(404).send({ msg: "No documents matching the query were found" });
    }
  } catch (error) {
    res.status(500).send({ status: false, message: error.message })
  }
};

module.exports.deleteByQuery = deleteByQuery


//=================================================================//
