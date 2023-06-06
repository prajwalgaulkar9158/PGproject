const express = require("express");
const mongoose = require('mongoose');
const app = express();
const route= require('./routes/route')

app.use(express.json());

mongoose.connect(
    "mongodb+srv://prajwalgaulkar78717:bXvJ3nSxWJSUIcpZ@cluster0.vdcbqqv.mongodb.net/urls",
    {
      usenewUrlParser: true,
    }
  )
  .then(() => console.log("mongoDB is connected"))
  .catch((err) => console.log(err));

app.use("/", route);
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listing on port : ${port}`);
});
