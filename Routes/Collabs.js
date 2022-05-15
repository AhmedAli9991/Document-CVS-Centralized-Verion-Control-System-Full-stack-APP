var express = require("express");
var router = express.Router();
var Collab = require("../Controler/Collab");

router.route("/add/:id").put(Collab.Add);
router.route("/view/:id").get(Collab.getcollab);
router.route("/users").get(Collab.getAllUsers);
router.route("/all").get(Collab.ViewAll);

module.exports = router;
