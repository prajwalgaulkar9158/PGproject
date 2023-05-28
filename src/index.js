const express = require("express");
const bodyParse = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes/route");
const app = express();

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));

mongoose
  .connect(
    "mongodb+srv://prajwalgaulkar78717:bXvJ3nSxWJSUIcpZ@cluster0.vdcbqqv.mongodb.net/RamKissan",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("mongoDB is conected"))
  .catch((err) => console.log(err));

app.use("/", routes);

app.listen(process.env.PORT || 3000, function () {
  console.log(`express is running on port ${process.env.PORT || 3000}`);
});
