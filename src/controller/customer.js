const customerModel = require("../models/customer");
const {
  NamePattern,
  MobPattern,
  datePattern,
  emailPattern,
  uuidPattern,
} = require("../vallidation/validator");

const createCustomer = async function (req, res) {
  const data = req.body;
  try {
    if (NamePattern(data.firstName) == false) {
      return res.status(400).send({
        status: false,
        msg: "firstName is invalid,please provide correct Name",
      });
    }
    if (NamePattern(data.lastName) == false) {
      return res.status(400).send({
        status: false,
        msg: "lastName is invalid,please provide correct Name",
      });
    }

    if (MobPattern(data.mobileNumber) == false) {
      return res
        .status(400)
        .send({ status: false, msg: "provide valid MobileNo" });
    }
    let mobile = await customerModel.findOne({
      mobileNumber: data.mobileNumber,
    }); 
    if (mobile)
      return res
        .status(400)
        .send({ status: false, msg: "MobileNo. all ready exist" });

    if (datePattern(data.DOB) == false) {
      return res
        .status(400)
        .send({ status: false, msg: "provide valid Date Of Birth." });
    }
    if (emailPattern(data.email) == true) {
      const findDupEmail = await customerModel.findOne({ email: data.email });
      if (findDupEmail)
        return res
          .status(400)
          .send({ status: false, msg: "Email all ready exist" });
    } else {
      return res
        .status(400)
        .send({ status: false, msg: "provide valid email ID" });
    }

    if (uuidPattern(data.customerID) == false) {
      return res
        .status(400)
        .send({ status: false, msg: "provide valid customerID" });
    }
    const uuid= await customerModel.findOne({customerID:data.customerID})
    if(uuid)return res.status(400).send({status:false,msg:"customer of this Id is ALLready present"})
    if (data.address.length == 0) {
      return res.status(400).send({
        status: false,
        msg: "address is invalid,please provide correct address",
      });
    }

    const result = await customerModel.create(data);
    res.status(201).send({ status: true, data: result });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: false, msg: "this is catch error" });
  }
};
module.exports.createCustomer = createCustomer;

/////////////////////////////////////////////////////////////////////////////////////

const getCustomer = async function (req, res) {
  try {
    const customerData = await customerModel
      .find({ status: "Active" })
      .select({ _id: 0 });
    if (customerData.length == 0)
      return res
        .status(404)
        .send({ status: false, msg: "Active customer Not found" });
    res.status(200).send({ status: true, Data: customerData });
  } catch (err) {
    res.status(500).send({ status: false, msg: err });
  }
};
module.exports.getCustomer = getCustomer;

/////////////////////////////////////////////////////////////////////////

const deleteCustomer = async function (req, res) {
  let customerId = req.params.customerID;
  try {
    let customer = await customerModel.findOneAndUpdate(
      { customerID: customerId },
      { $set: { status: "Inactive" } }
    );
    if (!customer)
      return res.status(404).send({ status: false, msg: "customer not found" });
    res.status(200).send({ status: true, msg: "customer Deleted" });
  } catch (err) {
    res.status(500).send({ status: false, msg: err });
  }
};
module.exports.deleteCustomer = deleteCustomer;
