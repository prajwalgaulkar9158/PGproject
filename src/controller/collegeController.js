const { query } = require("express");
const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel");



const validQparam= function(param){
  if(!param.name)return false
  if(param.name==""|| typeof param.name==''){return false}
return true
}


const postCollege = async function (req, res) {
  try {
    const data = req.body;
    const SavedData = await collegeModel.create(data);
    const { name, fullName, logoLink, isDeleted } = SavedData;
    res
      .status(201)
      .send({ status: true, data: { name, fullName, logoLink, isDeleted } });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: false, msg: "catch err form cntrl" });
  }
};
module.exports.postCollege = postCollege;


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//


const getCollegeDetails= async function (req,res){
  try {
    const qParam=req.query
    console.log(qParam);
    const checkQ= Object.keys(qParam)
    if(checkQ.length==0){return res.status(400).send({status:false,msg:"query is absent to search the college"})}
if(!validQparam(qParam)){return res.status(400).send({status:false,msg:"give valid college name in query Ex=>name=xyz"})}

    const college= await collegeModel.findOne(qParam)

    if(!college){return res.status(404).send({status:false,msg:"College Not Found"})}
    const findInternOfCollege=await internModel.find({$and:[{collegeId:college._id},{isDeleted:false}]}).select({name:1,email:1,mobile:1})


    let Obj={
      name:college.name,
      fullName:college.fullName,
      logoLink:college.logoLink,
      interns:findInternOfCollege
    }
;
    res.status(200).send({status:true,data:Obj})





  } catch (err) {
    console.log(err)
    res.status(500).send({status:false,msg:"catch err"})
  }
}
module.exports.getCollegeDetails=getCollegeDetails
