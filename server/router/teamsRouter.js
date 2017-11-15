const router = require("express").Router();
const controller = require("../controller/teamController");

router.get("/getAllTeams", controller.getAllTeams);
router.post("/savePlayerInfo", controller.savePlayerInfo);
router.get("/getTeamsPlayers", controller.getTeamsPlayers);

module.exports = router;
