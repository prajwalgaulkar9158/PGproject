const mongoose = require("mongoose");
const authorModel = require("../model/authorModel");
const blogModel = require("../model/blogModel");

//====================================CREATE BLOG==============================================
// Create a new blog
const createBlog = async function (req, res) {
  const { authorId, ...blogDocument } = req.body;

  try {
    // Check if the author exists
    const validAuthor = await authorModel.findById(authorId);
    if (!validAuthor) {
      return res.status(400).send({ status: false, msg: "Author not valid" });
    }

    // Create the blog
    const postBlog = await blogModel.create(blogDocument);
    return res.status(201).send({ status: true, data: postBlog });
  } catch (err) {
    return res.status(500).send({ status: false, error: err });
  }
};

module.exports.createBlog = createBlog;

// =========================================GET BLOGS ===========================================

// Retrieve blogs based on query parameters
const getBlogs = async function (req, res) {
  const qparam = req.query;

  try {

    if (qparam.length == 0) {
      const blog = await blogModel.find(
        { isDeleted: false },
        { isPublished: true }
      );
      return res.status(200).send({ status: true, data: blog });
    }

    // Find blogs that match the query parameters and are not deleted or unpublished
    const getdata = await blogModel.find({
      $and: [qparam, { isDeleted: false }, { isPublished: true }],
    });
    if (!getdata) {
      return res.status(400).send({ status: false, msg: "Blog not found" });
    }
    return res.status(200).send({ status: true, data: getdata });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err });
  }
};

module.exports.getBlogs = getBlogs;

//========================================UPDATE BLOGS============================================//

// Update a blog by its ID
const updateBlog = async function (req, res) {
  const blogId = req.params.blogId;
  const {
    body: newBody,
    tags: newTags,
    title: newTitle,
    subcategory: newSubcategory,
  } = req.body;

  try {
    // Find the blog by ID and update its properties
    const updatedata = await blogModel.findOneAndUpdate(
      { _id: blogId },
      {
        publishedAt: new Date(),
        isPublished: true,
        body: newBody,
        title: newTitle,
        $push: { tags: newTags, subcategory: newSubcategory },
      },
      { new: true }
    );

    if (!updatedata) {
      return res.status(404).send({ status: false, msg: "Blog not found" });
    } else {
      return res.status(201).send({ status: true, data: updatedata });
    }
  } catch (err) {
    return res.status(500).send({ status: false, error: err });
  }
};

module.exports.updateBlog = updateBlog;

//===================================DELETE BLOGS===============================================

// Delete a blog by its ID
const deleteBlog = async function (req, res) {
  const blogId = req.params.blogId;
  
   if(!blogId) return res.status(500).send("blogId is required")
   
  try {
    // Find the blog by ID and set the isDeleted and deletedAt properties
    const blog = await blogModel.findOneAndUpdate(
      { _id: blogId },
      { $set: { isDeleted: true, deletedAt: new Date() } }
    );

    if (!blog) {
      return res.status(404).send({ status: false, msg: "Blog not found" });
    } else {
      return res.status(200).send({ status: true });
    }
  } catch (err) {
    return res.status(500).send({ status: false, error: err });
  }
};

module.exports.deleteBlog = deleteBlog;

//======================================DELETE BY QUERY============================================

// Delete blogs based on query parameters
const deleteByQuery = async (req, res) => {
  try {
    const data = req.query;
    if (Object.keys(data).length === 0) {
      return res.status(200).send({ msg: "No query found to delete the blog" });
    }

    // Update multiple blogs that match the query and set the isDeleted and deletedAt properties
    const op = await blogModel.updateMany(data, {
      $set: { isDeleted: true, deletedAt: new Date() },
    });

    if (op.modifiedCount > 0) {
      return res.status(200).send({ msg: "Blogs deleted" });
    } else {
      return res
        .status(404)
        .send({ msg: "No blogs matching the query were found" });
    }
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports.deleteByQuery = deleteByQuery;

//=================================================================================================
