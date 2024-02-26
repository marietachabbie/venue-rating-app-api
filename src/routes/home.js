const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Venues rating app homepage!");
});

module.exports = router;
