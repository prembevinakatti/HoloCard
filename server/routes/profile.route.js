const express = require("express");
const {
  createProfile,
  getProfile,
} = require("../controllers/profile.controller");
const isAuthenticated = require("../middleware/isAuthenticated");

const router = express.Router();

router.route("/create").post(isAuthenticated, createProfile);
router.route("/get").get(isAuthenticated, getProfile);

module.exports = router;
