const config = require("../../config/config.json");
const compile = require("../modules/compiler.js");
const database = require("../../database/database.json");

const router = require("express").Router();
const rateLimit = require("express-rate-limit");

const taAPI = require("../../database/taAPI.js");

router.use(
  "/",
  rateLimit({
    windowMs: config.webserver.rateLimiter.api.windowMs,
    max: config.webserver.rateLimiter.api.max,
    handler: async (req, res) => res.status(429).send(await compile(req, res, "429")),
  })
);

router.get("/friends", (req, res) => {
  res.send(database.users);
});

router.get("/getLocalRestaurants", async (req, res) => {
  res.send(await taAPI.getLocalRestaurants());
});

router.get("/searchLocalRestaurants", async (req, res) => {
  res.send(req.query.q ? await taAPI.searchLocalRestaurants(req.query.q) : {});
});

module.exports = router;
