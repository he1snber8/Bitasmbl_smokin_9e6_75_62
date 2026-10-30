/**
 * Score: 0/100 | STATUS: FAIL ❌
 */

/**
 * -- Express router implemented in frontend instead of Svelte dashboard layout components. --
 *
 * Issue: Backend Express router file provided instead of required Svelte dashboard layout components.
 *
 * Impact: Fails all acceptance criteria for dashboard layout, sidebar, header, and responsive design.
 *
 * Suggestion: Implement reusable Svelte layout components featuring a responsive header, sidebar, and content area.
 */

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