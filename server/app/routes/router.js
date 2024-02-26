const config = require("../../config/config.json");
const express = require("express");
const router = express.Router();

const compile = require("../modules/compiler.js");

router.use(require("compression")());

router.use(express.static("dist/public"));

router.use("/api", require("./api.js"));

router.get("/", async (req, res) => {
  res.send(await compile(req, res, "home"));
});

router.get("/munch", async (req, res) => {
  res.send(await compile(req, res, "munch"));
});

router.get("/card", async (req, res) => {
  res.send(await compile(req, res, "card"));
});
module.exports = router;
