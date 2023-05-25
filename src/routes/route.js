const express = require('express');
const router = express.Router();
const authorController= require('../controller/authorcontroller')
const blogController= require('../controller/blogController')


//create Author document api
router.post('/createAuthor',authorController.author);
//login Author
router.get('/login',authorController.login);
//
router.post('/blogs',blogController.createBlog)

router.get('/blogs',blogController.getBlogs)


module.exports = router;

