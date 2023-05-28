const express = require("express");
const router = express.Router();

const customerController = require("../controller/customer");
const cardController = require("../controller/card");

//++++++++++++++++ create customer & cards +++++++++++++++++//

router.post("/createCustomer", customerController.createCustomer);
router.post("/createCards", cardController.createCards);

//++++++++++++++++++ get customer & cards +++++++++++++++++++++//

router.get("/getCustomer", customerController.getCustomer);
router.get("/getCard", cardController.getCard);

//+++++++++++++ delete customer ++++++++++++++++++++++++++++//

router.delete("/deleteCustomer/:customerID", customerController.deleteCustomer);

module.exports = router;
