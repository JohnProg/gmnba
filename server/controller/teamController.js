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
  }
};
