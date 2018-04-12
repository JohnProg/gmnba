// const Sequelize = require("sequelize");
// const bbscoutdb = require("./config");

// const PlayersSixteen = bbscoutdb.define("playerSixteen", {
//   name: { type: Sequelize.STRING, allowNull: false },
//   position: { type: Sequelize.STRING, allowNull: true },
//   team: { type: Sequelize.STRING, allowNull: true },
//   mpg: { type: Sequelize.FLOAT, allowNull: true },
//   gamesPlayed: { type: Sequelize.INTEGER, allowNull: true },
//   twoPtPct: { type: Sequelize.FLOAT, allowNull: true },
//   threePtPct: { type: Sequelize.FLOAT, allowNull: true },
//   fgPct: { type: Sequelize.FLOAT, allowNull: true },
//   freeThrowPct: { type: Sequelize.FLOAT, allowNull: true },
//   trb: { type: Sequelize.FLOAT, allowNull: true },
//   ast: { type: Sequelize.FLOAT, allowNull: true },
//   pts: { type: Sequelize.FLOAT, allowNull: true },
//   tov: { type: Sequelize.FLOAT, allowNull: true },
//   stl: { type: Sequelize.FLOAT, allowNull: true },
//   blk: { type: Sequelize.FLOAT, allowNull: true },
//   plusMinus: { type: Sequelize.FLOAT, allowNull: true },
//   draft: { type: Sequelize.STRING, allowNull: true },
//   experience: { type: Sequelize.STRING, allowNull: true },
//   height: { type: Sequelize.STRING, allowNull: true },
//   weight: { type: Sequelize.STRING, allowNull: true },
//   age: { type: Sequelize.STRING, allowNull: true },
//   college: { type: Sequelize.STRING, allowNull: true },
//   picture: { type: Sequelize.STRING, allowNull: true },
//   fgm: { type: Sequelize.STRING, allowNull: true },
//   fga: { type: Sequelize.STRING, allowNull: true },
//   orbPct: { type: Sequelize.STRING, allowNull: true },
//   astPct: { type: Sequelize.STRING, allowNull: true },
//   tovPct: { type: Sequelize.STRING, allowNull: true },
//   dws: { type: Sequelize.STRING, allowNull: true },
//   obpm: { type: Sequelize.STRING, allowNull: true },
//   vorp: { type: Sequelize.STRING, allowNull: true },
//   injury: { type: Sequelize.STRING, allowNull: true },
//   threePt: { type: Sequelize.STRING, allowNull: true },
//   threePtAtt: { type: Sequelize.STRING, allowNull: true },
//   twoPt: { type: Sequelize.STRING, allowNull: true },
//   twoPtAtt: { type: Sequelize.STRING, allowNull: true },
//   efgPct: { type: Sequelize.STRING, allowNull: true },
//   ft: { type: Sequelize.STRING, allowNull: true },
//   fta: { type: Sequelize.STRING, allowNull: true },
//   drbPct: { type: Sequelize.STRING, allowNull: true },
//   stlPct: { type: Sequelize.STRING, allowNull: true },
//   usgPct: { type: Sequelize.STRING, allowNull: true },
//   ws: { type: Sequelize.STRING, allowNull: true },
//   dbpm: { type: Sequelize.STRING, allowNull: true },
//   avgDistShot: { type: Sequelize.STRING, allowNull: true },
//   number: { type: Sequelize.STRING, allowNull: true },
//   orb: { type: Sequelize.STRING, allowNull: true },
//   drb: { type: Sequelize.STRING, allowNull: true },
//   pf: { type: Sequelize.STRING, allowNull: true },
//   per: { type: Sequelize.STRING, allowNull: true },
//   tsPct: { type: Sequelize.STRING, allowNull: true },
//   threePAr: { type: Sequelize.STRING, allowNull: true },
//   ftr: { type: Sequelize.STRING, allowNull: true },
//   trbPct: { type: Sequelize.STRING, allowNull: true },
//   blkPct: { type: Sequelize.STRING, allowNull: true },
//   ows: { type: Sequelize.STRING, allowNull: true },
//   wsFourtyEight: { type: Sequelize.STRING, allowNull: true },
//   bpm: { type: Sequelize.STRING, allowNull: true },
//   salary: { type: Sequelize.STRING, allowNull: true }
// });

// // PlayersSixteen.sync({ force: true }).then(() => {
// //   return PlayersSixteen.bulkCreate([
// //     { name: "Michael Griffin", position: "PG" }
// //   ]);
// // });
// PlayersSixteen.sync();

// module.exports = {
//   PlayersSixteen
// };
