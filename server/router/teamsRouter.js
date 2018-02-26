const router = require("express").Router();
const controller = require("../controller/teamController");

router.get("/getAllTeams", controller.getAllTeams);
router.post("/savePlayerInfo", controller.savePlayerInfo);
router.put("/upsertPlayerInfo", controller.upsertPlayerInfo);
router.get("/getTeamsPlayers", controller.getTeamsPlayers);
router.put("/updateTeams", controller.updateTeams);
router.put("/updatecTeams", controller.updatecTeams);
router.post("/createTeams", controller.createTeams);
router.get("/getTeamStats", controller.getTeamStats);
router.put("/updatePlayerStats", controller.updatePlayerStats);
router.put("/updatePlayerAdvancedStats", controller.updatePlayerAdvancedStats);
router.put(
  "/updateCPlayerAdvancedStats",
  controller.updateCPlayerAdvancedStats
);
router.get("/getPlayerStats", controller.getPlayerStats);
router.get("/getLeagueStats", controller.getLeagueStats);
router.post("/postCollegePlayers", controller.postCollegePlayers);
router.put("/updateCollegePlayers", controller.updateCollegePlayers);
router.get("/renderPlayerProfile", controller.renderPlayerProfile);
router.get("/renderTeamProfile", controller.renderTeamProfile);
router.get("/getPlayerProfile/:id", controller.getPlayerProfile);
router.get("/getPostStats/:name", controller.getPostStats);
router.get("/getTeamProfile/:id", controller.getTeamProfile);
router.put("/loadTeamLogoColor", controller.loadTeamLogoColor);
router.get("/getTeamColors/:team", controller.getTeamColors);
router.get("/getPositionStats", controller.getPositionStats);
router.get("/getCollegePlayerProfile/:id", controller.getCollegePlayerProfile);
router.post("/createCollegeTeams", controller.createCollegeTeams);
router.get("/getCollegeTeamColors/:team", controller.getCollegeTeamColors);
router.get("/getCollegeTeamProfile/:id", controller.getCollegeTeamProfile);
router.get("/getCollegeTeamsPlayers", controller.getCollegeTeamsPlayers);
router.get("/getcLeagueStats", controller.getcLeagueStats);
router.get("/getcPlayerStats", controller.getcPlayerStats);
router.get("/getcPositionStats", controller.getcPositionStats);
router.get("/getAllNbaPlayers", controller.getAllNbaPlayers);
router.get("/getAllCollegePlayers", controller.getAllCollegePlayers);
router.post("/createPostStats", controller.createPostStats);

router.get("/nbaPlayersList", controller.nbaPlayersList);
router.get("/collegePlayersList", controller.collegePlayersList);
router.get("/nbaTeamsList", controller.nbaTeamsList);
router.get("/collegeTeamsList", controller.collegeTeamsList);

module.exports = router;
