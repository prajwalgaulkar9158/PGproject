const authorModel = require("../model/authorModel");
const jwt = require('jsonwebtoken')
const {
  isValid,
  isValidEmail,
  isValidPassword,
  isValidRequest,
  regixValidator,
} = require("../validations/validators");

const createAuthor = async (req, res) => {
  try {
    const authorData = req.body;
    if (!isValidRequest(authorData)) {
      return res
        .status(400)
        .send({ status: false, msg: "author data is not present" });
    }
    const { fname, lname, title, email, password } = authorData;

    if (Object.keys(authorData) > 5) {
      return res
        .staus(400)
        .send({ status: false, msg: "Invalid data entry inside request body" });
    }
    if (!isValid(fname) || !regixValidator(fname)) {
      return res
        .status(400)
        .send({
          status: false,
          message:
            "first name is required or its should contain alphabets or you have given some blank spaces at start and end",
        });
    }
    if (!isValid(lname) || !regixValidator(lname)) {
      return res
        .staus(400)
        .send({
          status: false,
          msg: "last name is required or its should contain character",
        });
    }
    if (!isValid(title)) {
      return res.staus(400).send({ status: false, msg: "Title is required" });
    }
    if (!["Mr", "Mrs", "Miss"].includes(title)) {
      return res
        .status(400)
        .send({ status: false, message: "Title should contain Mr, Mrs, Miss" });
    }
    if (!isValid(email)) {
      return res.status(400).send({ staus: false, msg: "Email is required" });
    }
    if (!isValidEmail(email)) {
      return res
        .status(400)
        .send({ status: false, msg: "Enter a valid email address" });
    }

    const checkEmail = await authorModel.findOne({ email: email });

    if (checkEmail) {
      return res
        .status(400)
        .send({ status: false, msg: "Email already exits" });
    }
    if (!isValid(password)) {
      return res
        .status(400)
        .send({ status: false, msg: "Password is required" });
    }
    if (!isValidPassword(password)) {
      return res
        .status(400)
        .send({ status: false, msg: "Enter a valid password" });
    }

    const newAuthor = await authorModel.create(authorData);

    return res.status(400).send({ staus: true, data: newAuthor });
  } catch (error) {
    res.status(500).send({ status: false, error: err });
  }
};

const loginAuthor = async (req,res) => {
try{
    let email = req.body.email;
    let password = req.body.password;
    if(!email){
        return res.status(400).send({status:false,msg:"Enter your Email"})
    };
    if(!password){
        return res.status(400).send({ status: false, msg: "Enter your password" });
    };
    if(!isValidEmail(email)){
        return res.status(400).send({ status: false, message: "Email format or pattern is invalid" });
    };
    if(!isValidPassword(password)){
        return res.status(400).send({status:false, message: "Password should be min 6 and max 20 character.It contains atleast--> 1 Uppercase letter, 1 Lowercase letter, 1 Number, 1 Special character" })
    };

    const checkAuthor = await authorModel.findOne({email:email,password:password})

    if(!checkAuthor){
        return res.status(400).send({status:false,msg:"Email or password is not correct"})
    };

    let token  = jwt.sign({
        authorId: checkAuthor._id.toString(),
        batch: "technetium",
        group: 3
    },"Project-1");
    res.status(201).send({ status: true, data: token });
}catch(error){
    res.status(500).send({status:false,error:error.message})
}
}

module.exports.author = createAuthor;
module.exports.login = loginAuthor;