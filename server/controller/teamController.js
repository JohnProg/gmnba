const axios = require("axios");
const db = require("../db");
const circularJSON = require("circular-json");

module.exports = {
  getAllTeams: (req, res) => {
    console.log("get all teams hitting");
  },
  savePlayerInfo: (req, res) => {
    console.log("SAVING PLAYERS");
    var playersArr = req.body.data;
    //console.log("Players Array: \n", playersArr);
    for (var i = 250; i < playersArr.length; i++) {
      var player = playersArr[i];
      db.Players
        .findOrCreate({
          where: {
            college: player["College"],
            name: player["Name"],
            experience: player["Experience"],
            height: player["Height"],
            weight: player["Weight"],
            position: player["Position"],
            team: player["team"]
          }
        })
        .then(data => {
          console.log("Player added successfully");
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  getTeamsPlayers: (req, res) => {
    var team = req.query.team;
    console.log(team);
    db.Players
      .findAll({
        where: {
          team: team
        }
      })
      .then(data => {
        res.status(200).send(data);
        console.log("Successfully retrieved roster!!");
      })
      .catch(err => {
        res.status(500).send(err);
        console.log("ERROR RETREIVING ROSTER\n", err);
      });
  },
  updateTeam: (req, res) => {
    console.log("REQ\n", req);
  },
  createTeams: (req, res) => {
    console.log("pst request: ", req);
    var teamsArr = req.body.data;
    for (var i = 0; i < teamsArr.length; i++) {
      var team = teamsArr[i];
      db.Teams
        .findOrCreate({
          where: {
            Name: team["team"],
            FG: team["FG"],
            FGA: team["FGA"],
            FG_PCT: team["FGPCT"],
            Three_Pointers: team["3P"],
            Three_Pointers_Att: team["3PA"],
            Three_Pointers_Pct: team["3PCT"],
            Two_Pointers: team["2P"],
            Two_Pointers_Att: team["2PA"],
            Two_Pointers_Pct: team["2PCT"],
            FTM: team["FTM"],
            FTA: team["FTA"],
            FT_PCT: team["FTPCT"],
            ORB: team["ORB"],
            DRB: team["DRB"],
            TRB: team["TRB"],
            AST: team["AST"],
            STL: team["STL"],
            BLK: team["BLK"],
            TOV: team["TOV"],
            PF: team["PF"],
            PTS: team["PTS"],
            W: team["W"],
            L: team["L"],
            PW: team["PW"],
            PL: team["PL"],
            MOV: team["MOV"],
            SOS: team["SOS"],
            SRS: team["SRS"],
            ORtg: team["ORtg"],
            DRtg: team["DRtg"],
            PACE: team["PACE"],
            FTr: team["FTr"],
            Three_PAr: team["3PAr"],
            OFF_eFG_PCT: team["OFF-eFG%"],
            OFF_TOV_PCT: team["OFF-TOV%"],
            ORB_PCT: team["ORB%"],
            OFF_FT_FGA: team["OFF-FT/FGA"],
            DEF_eFG_PCT: team["DEF-eFG%"],
            DEF_TOV_PCT: team["DEF-TOV%"],
            DRB_PCT: team["DRB%"],
            DEF_FT_FGA: team["DEF-FT/FGA"],
            oFG: team["oFG"],
            oFGA: team["oFGA"],
            oFGPCT: team["oFGPCT"],
            o3P: team["o3P"],
            o3PA: team["o3PA"],
            o3PCT: team["o3PCT"],
            o2P: team["o2P"],
            o2PA: team["o2PA"],
            o2PCT: team["o2PCT"],
            oFTM: team["oFTM"],
            oFTA: team["oFTA"],
            oFTPCT: team["oFTPCT"],
            oORB: team["oORB"],
            oDRB: team["oDRB"],
            oTRB: team["oTRB"],
            oAST: team["oAST"],
            oSTL: team["oSTL"],
            oBLK: team["oBLK"],
            oTOV: team["oTOV"],
            oPF: team["oPF"],
            oPTS: team["oPTS"]
          }
        })
        .then(data => {
          console.log("Team Average saved");
        })
        .catch(err => {
          console.log("Error saving team average: ", err);
        });
    }
  },
  getTeamStats: (req, res) => {
    console.log("REQ.BODY\n", req.query.team);
    var team = req.query.team;
    db.Teams
      .findAll({
        where: {
          Name: team
        }
      })
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
