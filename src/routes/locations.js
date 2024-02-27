const express = require("express");
const router = express.Router();

const locationService = require("../services/location");

router.get("/", async (req, res, next) => {
  try {
    const allLocations = await locationService.getAll(req.body);
    res.send(allLocations);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const dbResponse = await locationService.createNewLocation(req.body);
    res.send(dbResponse);
  } catch (err) {
    next(err);
  }
});

router.get("/:location_id", async (req, res, next) => {
  try {
    const location = await locationService.getOne(req.params);
    res.send(location);
  } catch (err) {
    next(err);
  }
});

router.patch("/:location_id", async (req, res, next) => {
  try {
    await locationService.updateById(req.params, req.body);
    res.send({ message: "Sucessfully updated!" });
  } catch (err) {
    next(err);
  }
});

router.patch("/", async (req, res, next) => {
  try {
    await locationService.updateByCategory(req.body);
    res.send({ message: "Sucessfully updated!" });
  } catch (err) {
    next(err);
  }
});

router.delete("/:location_id", async (req, res, next) => {
  try {
    await locationService.deleteById(req.params);
    res.send({ message: "Sucessfully deleted!" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
