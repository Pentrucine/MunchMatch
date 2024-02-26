const config = require("../config/config.json");
const webserver = require("express")();
const router = require("./routes/router");

module.exports = function () {
  webserver.use("/", router);
  webserver.listen(config.webserver.port);
  console.log("Active!");
};
