const express = require('express');
const router = express.Router();
const authorController = require('../controller/authorcontroller');
const blogController = require('../controller/blogController');
const midAuth = require('../middleware/auth');
const valid = require('../middleware/validate')

//====================================PHASE 1====================================================
// Create author
router.post('/authors',valid.validateAuthor, authorController.author);

// Create blog
router.post('/blogs',valid.validateBlog, midAuth.authentication, blogController.createBlog);

// Get blogs
router.get('/blogs', midAuth.authentication, blogController.getBlogs);

// Update blog
router.put('/blogs/:id', midAuth.authentication, midAuth.authorisation, blogController.updateBlog);

// Delete blog
router.delete('/blogs/:id', midAuth.authentication, midAuth.authorisation, blogController.deleteBlog);

// Delete blogs by query
router.delete('/blogs', midAuth.authentication, midAuth.authorisation, blogController.deleteByQuery);


//===========================================PHASE 2 ================================================
// Author login
router.post('/login', valid.validateLogin,authorController.loginAuthor);

module.exports = router;
