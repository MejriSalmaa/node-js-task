const express = require("express");

require("./config/connect.js");
//timporti routes
const userRoute = require("./routes/user");

const app = express();
//testa3melhom
app.use(express.json());
//yousel endpoints lkol l taht user.js
app.use("/user", userRoute);
app.listen(3000, () => {
  console.log("server works");
});
