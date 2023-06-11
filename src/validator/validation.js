const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel");

const nameRejex = function (name) {
    const result = /^[A-Za-z\s.',-]+$/
        ;
    return result.test(name);
};

const EmailRejex= function (email){
    const rejex=/^[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+$/
 return rejex.test(email)
}


const mobileRejex=function (mobile){
    const rejex=/^\d{10}$/
return rejex.test(mobile)
}
//////////////////////////////////////////////////////////////////////////////////////////////////


const PostcollegeVal = async function (req, res, next) {
    try {
        const { name, fullName, logoLink } = req.body;
        const emptyBody = Object.keys(req.body);
        if (emptyBody.length == 0) {
            return res
                .status(400)
                .send({ status: false, msg: "Please Provides College Info" });
        }

        //************* name valiodation *************/

        if (!name) {
            return res.status(400).send({
                status: false,
                msg: "Please Provides College 'name'",
            });
        }
        if (!nameRejex(name) || typeof name != "string") {
            return res.status(400).send({
                status: false,
                msg: "invalid Name",
            });
        }
        const CheckNameInDb = await collegeModel.findOne({ name: name })
        if (CheckNameInDb) { return res.status(400).send({ status: false, msg: "this name of college is allready exist" }) }
        //************* fullname valiodation *************/
        if (!fullName) {
            return res
                .status(400)
                .send({ status: false, msg: "fullName is required" });
        }
        if (!nameRejex(fullName) || typeof fullName != "string") {
            return res.status(400).send({ status: false, msg: "invalid Full name" });
        }

        //************* logolink valiodation *************/

        const urlRejex = /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif|jfif))$/i;
        if (!logoLink) { return res.status(400).send({ status: false, msg: 'please provide logoLink' }) }
        if (!urlRejex.test(logoLink)) { return res.status(400).send({ status: false, msg: 'invalid link' }); }

        ///++++++++++++++++++++++++++///

        next()

    } catch (err) {
        res.status(500).send({ status: false, msg: "catch err form validator" });
    }
};
module.exports.PostcollegeVal = PostcollegeVal;


////////////////////////////////////////////////////////////////////////////////////////////////////////

const PostInternVal=async function(req,res,next){
    try {
        const {name,email,mobile,collegeName}=req.body
 const emptyBody= Object.keys(req.body)
 if(emptyBody.length==0){return res.status(400).send({status:false,msg:"Please Provide Interns Info"})
 }

 //++++++++++   validation for name    ++++++++++++++//

 if(!name){return res.status(400).send({ status: false, msg: "please provide Name Of Intern" });
}
if(!nameRejex(name)|| typeof name!='string'){return  res.status(400).send({ status: false, msg: "Name is Invalid" });
}

//+++++++++++++++++++++++ email validation   ++++++++++++++++++++//

if(!email){return res.status(400).send({ status: false, msg: "Please Provide Email"})}
if(!EmailRejex(email)){return res.status(400).send({ status: false, msg: "Email Is Invalid"})}



//+++++++++++++++++++++ mobile number +++++++++++++++++++//

if(!mobile){return res.status(400).send({ status: false, msg: "Please Provide MobileNo."})}
if(!mobileRejex(mobile)){return res.status(400).send({ status: false, msg: " MobileNo.Is invalid"})}
const checkMobile= await internModel.findOne({$or:[{email:email},{mobile:mobile}]})
if(checkMobile){return res.status(400).send({ status: false, msg: " MobileNo. Or Email Allready Exist"})}

//+++++++++++++++++++ college Name +++++++++++++++++++++//

if(!collegeName){return res.status(400).send({ status: false, msg: "Please Provide CollegeName."})}
if(!nameRejex(collegeName)){return res.status(400).send({ status: false, msg: "Please Provide valid College Name."})}

//+++++++++++++++++++++++++++++++++++++++++++++++++//

next()

        
        
    } catch (err) {
        res.status(500).send({ status: false, msg: "catch err form validator" });

    }
}
module.exports.PostInternVal=PostInternVal

