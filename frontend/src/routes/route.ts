const express = require("express");
const router = express.Router();

router.get("/", (request, res) => {
  console.log(request, "hahhaha");

  res.send("User list");
});

router.get("/:id", (req, res) => {
  res.send(`User ID: ${req.params.id}`);
});

module.exports = router;