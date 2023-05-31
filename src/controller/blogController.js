const mongoose = require("mongoose");
const authorModel = require("../model/authorModel");
const blogModel = require("../model/blogModel");

//====================================CREATE BLOG==============================================
// Create a new blog
const createBlog = async function (req, res) {
  const {authorId} = req.body;

  try {
    // Check if the author exists
    const validAuthor = await authorModel.findById(authorId);
    if (!validAuthor) {
      return res.status(404).send({ status: false, msg: "Author not valid" });
    }

    // Create the blog
    const postBlog = await blogModel.create(req.body);
    const createdBlog= await blogModel.findById(postBlog._id).select({authorId:0,_id:0,__v:0})
    return res.status(201).send({ status: true, data: createdBlog });
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

    if (Object.keys(qparam).length === 0) {
      const getAllData = await blogModel.find({
        $and: [{authorId:req.tokenId}, { isDeleted: false }, { isPublished: true }],
      })
      if(getAllData.length==0) return res.status(404).send({ status: false, msg: "Blog not found" })      

      return res.status(200).send({ status: true, data: getdata });
    }

    // Find blogs that match the query parameters and are not deleted or unpublished
    console.log(...Object.entries(qparam).map(([key, value]) => ({ [key]: value })),"kkkk")
    const searchingParam=    {  $and: [{authorId:req.tokenId},{$or:[...Object.entries(qparam).map(([key, value]) => ({ [key]: value }))]}, { isDeleted: false }, { isPublished: true }],}

    const getdata = await blogModel.find(searchingParam);//,
    console.log(qparam);
    if (getdata.length==0) {
      return res.status(404).send({ status: false, msg: "Blog not found" });
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

  let flag=true
  let time= new Date()
  if(req.body.isPublished==false){
    flag=false
  time = null}
    
  try {
   
    // Find the blog by ID and update its properties
    const updatedata = await blogModel.findOneAndUpdate(
      {$and:[{_id:blogId},{isDeleted:false}]},
      {
        publishedAt:time,
        isPublished: flag,
        body: newBody,
        title: newTitle,
        $push: { tags: newTags, subcategory: newSubcategory },
      },
      { new: true }
    );

    if (!updatedata) {
      return res.status(404).send({ status: false, msg: "Blog  with this id not found" });
    } else {
      return res.status(200).send({ status: true, data: updatedata });
    }
  } catch (err) {
    return res.status(500).send({ status: false, error: err });
  }
};

module.exports.updateBlog = updateBlog;

//===================================DELETE BLOGS BY ID===============================================

// Delete a blog by its ID
const deleteBlog = async function (req, res) {
  const blogId = req.params.blogId;
  
   if(!blogId) return res.status(400).send({status:false,msg:"please give blogId in path"})
   
  try {
    // Find the blog by ID and set the isDeleted and deletedAt properties
    const blog = await blogModel.findOneAndUpdate(
      {$and:[{ _id: blogId},{isDeleted:false}] },
      { $set: { isDeleted: true, deletedAt: new Date() } }
    );

    if (!blog) {
      return res.status(404).send({ status: false, msg: "Blog not found Or it was delete allready" });
    } else {
      return res.status(200).send({ status: true ,msg:"blog deleted"});
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
    const qparam = req.query;
    if (Object.keys(qparam).length === 0) {
      return res.status(200).send({ msg: "No query found to delete the blog" });
    }

    // Update multiple blogs that match the query and set the isDeleted and deletedAt properties
    const op = await blogModel.updateMany({$and:[{authorId:req.tokenId},{$or:[...Object.entries(qparam).map(([key, value]) => ({ [key]: value }))]},{isDeleted:false}]}, {
      $set: { isDeleted: true, deletedAt: new Date() },
    });

    if (op.modifiedCount > 0) {
      return res.status(200).send({ status:true,msg: `${op.modifiedCount} Blogs deleted for this ID` });
    } else {
      return res
        .status(403)
        .send({ msg: "(Unauthorize) No blogs matching the query and authorId " });
    }
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports.deleteByQuery = deleteByQuery;

//=================================================================================================
