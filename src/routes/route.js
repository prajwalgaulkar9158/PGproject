const express = require('express');
const router = express.Router();
const authorController= require('../controller/authorcontroller')
const blogController= require('../controller/blogController')

router.post('/authors',authorController.author)// create author
router.post('/blogs',blogController.createBlog)// create blog

router.get('/blogs',blogController.getBlogs)
router.put('/blogs/:blogId',blogController.updateBlog)

router.delete('/blogs/:blogId',blogController.deleteBlog)
router.delete('/blogs',blogController.deleteByQuery)




module.exports = router;

