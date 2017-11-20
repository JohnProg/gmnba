const router = require("express").Router();
const controller = require("../controller/teamController");

router.get("/getAllTeams", controller.getAllTeams);
router.post("/savePlayerInfo", controller.savePlayerInfo);
router.get("/getTeamsPlayers", controller.getTeamsPlayers);
router.put("/updateTeam", controller.updateTeam);
router.post("/createTeams", controller.createTeams);
router.get("/getTeamStats", controller.getTeamStats);
router.put("/updatePlayerStats", controller.updatePlayerStats);
router.get("/getPlayerStats", controller.getPlayerStats);
router.get("/getLeagueStats", controller.getLeagueStats);

module.exports = router;
