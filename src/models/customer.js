// const mongoose = require("mongoose");
// const customerSchema = new mongoose.Schema(
//   {
//     firstName: {
//       type: String,
//       required: true,
//     },
//     lastName: {
//       type: String,
//       required: true,
//     },
//     mobileNumber: {
//       type: String,
//       required: true,

//     },

//     DOB: String,

//     email:{
//       type:String,
//       required:true
//     },
//     address: {
//       type: String,
//       required: true,
//     },
//     customerID: {
//       type: String,
//       required: true,
//     },
//     status: {
//       type: String,
//       required: true,
//       default: "Active",
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("customer", customerSchema)

const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    DOB: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    customerID: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("customers", customerSchema);

