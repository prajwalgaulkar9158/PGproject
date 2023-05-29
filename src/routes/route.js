const express = require('express');
const router = express.Router();
const authorController = require('../controller/authorcontroller');
const blogController = require('../controller/blogController');
const midAuth = require('../middleware/auth');

//====================================PHASE 1====================================================
// Create author
router.post('/authors', authorController.author);

// Create blog
router.post('/blogs', midAuth.authentication, blogController.createBlog);

// Get blogs
router.get('/blogs', midAuth.authentication, blogController.getBlogs);

// Update blog
router.put('/blogs/:blogId', midAuth.authentication, midAuth.authorisation, blogController.updateBlog);

// Delete blog
router.delete('/blogs/:blogId', midAuth.authentication, midAuth.authorisation, blogController.deleteBlog);

// Delete blogs by query
router.delete('/blogs', midAuth.authentication, midAuth.authorisation, blogController.deleteByQuery);


//===========================================PHASE 2 ================================================
// Author login
router.post('/login', authorController.loginAuthor);

module.exports = router;
