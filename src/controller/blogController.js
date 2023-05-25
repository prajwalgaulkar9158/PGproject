const mongoose = require("mongoose");
const authorModel = require("../model/authorModel");
const blogModel = require("../model/blogModel");

const createBlog = async function (req, res) {
  const blogDocument = req.body;
  const authorId = req.body.authorId;

  let validAuthor = await authorModel.findById(authorId);

  try {
    if (!validAuthor) {
      return res.status(400).send({ status: false, msg: "" });
    } else {
      let postBlog = await blogModel.create(blogDocument);

      return res.status(201).send({ status: true, data: postBlog });
    }
  } catch (err) {
    res.status(500).send({ status: false, error: err });
  }
};
// =======================

const deleteById = async (req, res) => {
  try {
    let blogId = req.params.blogId;
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res
        .status(400)
        .send({ status: false, msg: "Enter a Valid blog Id" });
    }
    let saveData = await blogModel.findOne({ _id: blogId, isDeleted: false });
    if (!saveData) {
      return res.status(400).send({ status: false, msg: "blog Not found" });
    }
    const updateBlog = await blogModel.findByIdAndUpdate(
      { _id: blogId },
      { isDeleted: true },
      { new: true }
    );

    res.status(201).send({ status: true, msg: "success", data: updateBlog });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
};

module.exports.createBlog = createBlog;

// POST /blogs
// Create a blog document from request body. Get authorId in request body only.

// Make sure the authorId is a valid authorId by checking the author exist in the authors collection.

// Return HTTP status 201 on a succesful blog creation. Also return the blog document. The response should be a JSON object like this

// Create atleast 5 blogs for each author

// Return HTTP status 400 for an invalid request with a response body like this

// POST /blogs
// Create a blog document from request body. Get authorId in request body only.

// Make sure the authorId is a valid authorId by checking the author exist in the authors collection.

// Return HTTP status 201 on a succesful blog creation. Also return the blog document. The response should be a JSON object like this

// Create atleast 5 blogs for each author

// Return HTTP status 400 for an invalid request with a response body like this
