const express = require('express');
const router = express.Router();
const authorController= require('../controller/authorcontroller')
const blogController= require('../controller/blogController')
const midAuth=require('../middleware/auth')

router.post('/authors',authorController.author)// create author
router.post('/blogs',midAuth.authantication, blogController.createBlog)// create blog

router.get('/blogs',midAuth.authantication,blogController.getBlogs)
router.put('/blogs/:blogId',midAuth.authantication,midAuth.authorisation,blogController.updateBlog)

router.delete('/blogs/:blogId',midAuth.authantication,midAuth.authorisation,blogController.deleteBlog)
router.delete('/blogs',midAuth.authantication,blogController.deleteByQuery)

router.post('/login',authorController.loginAuthor)




module.exports = router;

