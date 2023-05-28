const cardModel = require("../models/cardModel");
const { NamePattern } = require("../vallidation/validator");
const mongoose = require("mongoose");

const createCards = async function (req, res) {
  let data = req.body;
  try {
    if (NamePattern(data.customerName) == false) {
      return res.status(400).send({ status: false, msg: "provide valid name" });
    }
    if (!mongoose.Types.ObjectId.isValid(data.customerID)) {
      return res
        .status(400)
        .send({ status: false, msg: "provide valid customerID" });
    }

    let result = await cardModel.create(data);
    let noOfDoc = await cardModel.find().count();
    let cardNo = result.cardNumber;
    let x = parseInt(cardNo.substring(1));
    x = x + noOfDoc;
    let z = cardNo[0] + x.toString().padStart(3, "0");

    let updateddoc = await cardModel.findOneAndUpdate(
      { customerID: data.customerID },
      { $set: { cardNumber: z } },
      { new: true }
    );
    res.status(201).send({ status: true, Data: updateddoc });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: false, msg: "this is catch err" });
  }
};
module.exports.createCards = createCards;

///////////////////////////////////////////////////////////////////

const getCard = async function (req, res) {
  try {
    let cardData = await cardModel.find().select({ _id: 0 });
    if (cardData.length == 0)
      return res.status(404).send({ status: false, msg: "card Not found" });
    res.status(200).send({ status: true, Data: cardData });
  } catch (err) {
    res.status(500).send({ status: false, msg: "this is catch err" });
  }
};
module.exports.getCard = getCard;
