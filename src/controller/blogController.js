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
// ====================================================================================

// const getBlogs = async (req, res) => {
//   try {

//     let data = req.query;
//      console.log(data);
  
//      let blogs = await blogModel.find({
//       $and: [
//         { isDeleted: false },
//         { isPublished: true },{$and:data}
//       ]
//     });
    
    
//     console.log(blogs)

//     if (!blogs.length==0) return res.status(200).json(blogs);
//     else  return res.status(404).send({ error: "No blogs found." });

     
//   } catch (error) {
//     res
//       .status(500)
//       .send({ error: "server error" });
//   }
// };
// const getBlogs = async (req, res) => {
//   try {
//     const { authorId, category, tags, subCategory } = req.query;

//     const filter = {
//       isDeleted: false,
//       isPublished: true,
//     };

//     if (authorId) filter.authorId = authorId;
//     if (category) filter.category = category;
//     if (tags) filter.tags = tags;
//     if (subCategory) filter.subCategory = subCategory;

//     const blogs = await blogModel.find(filter);

//     if (blogs.length === 0)
//       return res.status(404).json({ error: "No blogs found." });

//     res.status(200).json(blogs);
//   } catch (error) {
//     res.status(500).json({ error: "An error occurred while retrieving blogs." });
//   }
// };
const getBlogs= async function (req, res) {
  try {
    const data = req.query;
    // console.log(data);
    const { authorId } = data;

    if (authorId && !validator.isValidId(authorId)) {
      return res
        .status(400)
        .send({ status: false, msg: "Not a valid authorId" });
    }

    const filter = {
      ...data,
      isDeleted: false,
      isPublished: true,
    };

    const allElement = await blogModel.find(filter);

    if (allElement.length === 0)
      return res
        .status(404)
        .send({ status: false, msg: "No data found for the given user" });

    return res.status(200).send({ status: true, msg: "Required blog is given below", data: allElement });
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message });
  }
};


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

    return res.send({ status: true, msg: "success", data: updateBlog });
  } catch (err) {
    return res.send({ status: false, error: err.message });
  }
};

module.exports ={createBlog,getBlogs,deleteById}
//============================================================================================

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
