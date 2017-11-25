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
    console.log("TEAM:", team);
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
  },
  updatePlayerStats: (req, res) => {
    console.log("REQ\n", req.body.data);
    var players = req.body.data;
    for (var i = 0; i < players.length; i++) {
      var player = players[i];
      db.Players
        .update(
          {
            mpg: player["MPG"] || "0.0",
            gamesPlayed: player["GP"] || "0.0",
            twoPtPct: player["2PCT"] || "0.0",
            twoPt: player["2P"] || "0.0",
            twoPtAtt: player["2PA"] || "0.0",
            threePt: player["3P"] || "0.0",
            threePtAtt: player["3PA"] || "0.0",
            threePtPct: player["3PCT"] || "0.0",
            ast: player["AST"] || "0.0",
            age: player["Age"] || "0.0",
            blk: player["BLK"] || "0.0",
            drb: player["DRB"] || "0.0",
            fgm: player["FG"] || "0.0",
            fga: player["FGA"] || "0.0",
            fgPct: player["FGPCT"] || "0.0",
            ft: player["FT"] || "0.0",
            fta: player["FTA"] || "0.0",
            freeThrowPct: player["FTPCT"] || "0.0",
            orb: player["ORB"] || "0.0",
            pf: player["PF"] || "0.0",
            pts: player["PTS"] || "0.0",
            stl: player["STL"] || "0.0",
            tov: player["TOV"] || "0.0",
            trb: player["TRB"] || "0.0",
            efgPct: player["eFG"] || "0.0"
          },
          {
            where: { name: player["Name"] },
            returning: true
          }
        )
        .then(data => {
          console.log("Player saved successfully!!!");
        })
        .catch(err => {
          console.log("Error saving player!!!\n", err);
        });
    }
  },
  getPlayerStats: (req, res) => {
    console.log(req.query.team);
    console.log(req.query.statOne);
    console.log(req.query.statTwo);
    console.log(req.query.position);
    db.Players
      .findAll({
        where: { team: req.query.team }
      })
      .then(data => {
        console.log("Successfully retrieved player data!!");
        res.status(200).send(data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  getLeagueStats: (req, res) => {
    db.Teams
      .findAll({})
      .then(data => {
        console.log("Successfully retrieved all teams");
        res.status(200).send(data);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  postCollegePlayers: (req, res) => {
    console.log("SAVING PLAYERS");
    var playersArr = req.body.data;
    //console.log("Players Array: \n", playersArr);
    for (var i = 0; i < playersArr.length; i++) {
      var player = playersArr[i];
      db.cPlayers
        .findOrCreate({
          where: {
            class: player["Class"],
            name: player["Name"],
            height: player["Height"],
            highschool: player["HighSchool"],
            weight: player["Weight"],
            number: player["Number"],
            team: player["School"],
            position: player["Position"],
            hometown: player["Hometown"]
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
  updateCollegePlayers: (req, res) => {
    console.log("REQ\n", req.body.data);
    var players = req.body.data;
    for (var i = 0; i < players.length; i++) {
      var player = players[i];
      db.cPlayers
        .update(
          {
            mpg: player["MPG"] || "0.0",
            gamesPlayed: player["Games"] || "0.0",
            twoPtPct: player["2P%"] || "0.0",
            twoPt: player["2P"] || "0.0",
            twoPtAtt: player["2PA"] || "0.0",
            threePt: player["3P"] || "0.0",
            threePtAtt: player["3PA"] || "0.0",
            threePtPct: player["3P%"] || "0.0",
            ast: player["AST"] || "0.0",
            blk: player["BLK"] || "0.0",
            drb: player["DRB"] || "0.0",
            fgm: player["FG"] || "0.0",
            fga: player["FGA"] || "0.0",
            fgPct: player["FG%"] || "0.0",
            ft: player["FT"] || "0.0",
            fta: player["FTA"] || "0.0",
            freeThrowPct: player["FT%"] || "0.0",
            orb: player["ORB"] || "0.0",
            pf: player["PF"] || "0.0",
            pts: player["PTS"] || "0.0",
            stl: player["STL"] || "0.0",
            tov: player["TOV"] || "0.0",
            trb: player["TRB"] || "0.0"
          },
          {
            where: { name: player["Name"] },
            returning: true
          }
        )
        .then(data => {
          console.log("Player saved successfully!!!");
        })
        .catch(err => {
          console.log("Error saving player!!!\n", err);
        });
    }
  },
  renderPlayerProfile: (req, res) => {
    res.redirect(`/player/${req.params.id}`);
  },
  renderTeamProfile: (req, res) => {
    res.redirect(`/team/${req.params.id}`);
  },
  getPlayerProfile: (req, res) => {
    db.Players
      .findById(req.params.id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  getTeamProfile: (req, res) => {
    db.Teams
      .findById(req.params.id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  loadTeamLogoColor: (req, res) => {
    db.Teams
      .update(
        {
          Color_Main: "#000",
          Color_Sec: "#007DC5",
          Color_Third: "#C4CED4"
        },
        {
          where: { Name: "Dallas Mavericks" },
          returning: true
        }
      )
      .then(data => {
        console.log("Team updated successfully");
      })
      .catch(err => {
        console.log("Error updating team\n", err);
      });
  }
};
