const express = require("express");
const router = express.Router();

const locationService = require("../services/location");

router.get("/", async (req, res) => {
  const allLocations = await locationService.getAll(req.body);
  res.send(allLocations);
});

router.post("/", async (req, res) => {
  const dbResponse = await locationService.createNewLocation(req.body);
  res.send(dbResponse);
});

router.get("/:location_id", async (req, res) => {
  const location = await locationService.getOne(req.params);
  res.send(location);
});

router.patch("/:location_id", async (req, res) => {
  await locationService.updateById(req.params, req.body);
  res.send({ message: "Sucessfully updated!" });
});

router.patch("/", async (req, res) => {
  await locationService.updateByCategory(req.body);
  res.send({ message: "Sucessfully updated!" });
});

router.delete("/:location_id", async (req, res) => {
  await locationService.deleteById(req.params);
  res.send({ message: "Sucessfully deleted!" });
});

module.exports = router;
