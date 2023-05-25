const express = require('express');
const router = express.Router();
const authorController= require('../controller/authorcontroller')
const blogController= require('../controller/blogController')


router.post('/blogs',blogController.createBlog)


module.exports = router;





