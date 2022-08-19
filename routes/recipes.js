const Ajv = require("ajv");
var recipes = require("../recipes.json");
var router = require("express").Router();
router.get("/shopping-list", (req, res) => {
  const schema = {
    type: "object",
    properties: {
      ids: { type: "string" },
    },
    required: ["ids"],
  };
  const ajv = new Ajv();
  const valid = ajv.validate(schema, req.query);
  if (!valid) res.status(400).send(ajv.errors);

  // request is valid. Do whatever.
  let ids = req.query.ids;
  try {
    let data = recipes.filter((a) => a.id == ids);
    res.send(data[0].ingredients);
  } catch (error) {
    res.status(404).send("NOT_FOUND");
  }
});
module.exports = router;
