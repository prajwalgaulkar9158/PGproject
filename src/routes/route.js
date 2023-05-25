const express = require('express');
const router = express.Router();
const authorController= require('../controller/authorcontroller')
const blogController= require('../controller/blogController')


router.post('/blogs',blogController.createBlog)
//=============================Author's Api
//create Author document api;s
router.post('/createAuthor',authorController.author);

module.exports = router;





