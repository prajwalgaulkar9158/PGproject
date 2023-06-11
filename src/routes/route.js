const express= require('express')
const router= express.Router()

const validator= require('../validator/validation')
const internController= require('../controller/internController')
const collegeController=require('../controller/collegeController')



router.post('/functionup/colleges',validator.PostcollegeVal,collegeController.postCollege)//

router.post('/functionup/interns',validator.PostInternVal,internController.postIntern)

router.get('/functionUp/collegeDetails',collegeController.getCollegeDetails)

module.exports=router