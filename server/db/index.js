const Sequelize = require("sequelize");
const db = require("./config").db;
const cdb = require("./config").cdb;
const ligaacbdb = require("./config").ligaacbdb;
const tracking1db = require("./config").tracking1db;
const tracking2db = require("./config").tracking2db;
const tracking3db = require("./config").tracking3db;
const tracking4db = require("./config").tracking4db;
const tracking5db = require("./config").tracking5db;
const tracking6db = require("./config").tracking6db;
const tracking7db = require("./config").tracking7db;
const tracking8db = require("./config").tracking8db;
const tracking9db = require("./config").tracking9db;
const eurodb = require("./config").eurodb;
const gleaguedb = require("./config").gleaguedb;
const salariesdb = require("./config").salariesdb;

const bbscoutdb = require("./config").bbscoutdb;

// ************************************************
// Main MODELS
// ************************************************

const PlayersNineteen = bbscoutdb.define("playerNineteen", {
  name: { type: Sequelize.STRING, allowNull: false },
  position: { type: Sequelize.STRING, allowNull: true },
  team: { type: Sequelize.STRING, allowNull: true },
  mpg: { type: Sequelize.FLOAT, allowNull: true },
  gamesPlayed: { type: Sequelize.INTEGER, allowNull: true },
  twoPtPct: { type: Sequelize.FLOAT, allowNull: true },
  threePtPct: { type: Sequelize.FLOAT, allowNull: true },
  fgPct: { type: Sequelize.FLOAT, allowNull: true },
  freeThrowPct: { type: Sequelize.FLOAT, allowNull: true },
  trb: { type: Sequelize.FLOAT, allowNull: true },
  ast: { type: Sequelize.FLOAT, allowNull: true },
  pts: { type: Sequelize.FLOAT, allowNull: true },
  tov: { type: Sequelize.FLOAT, allowNull: true },
  stl: { type: Sequelize.FLOAT, allowNull: true },
  blk: { type: Sequelize.FLOAT, allowNull: true },
  plusMinus: { type: Sequelize.FLOAT, allowNull: true },
  draft: { type: Sequelize.STRING, allowNull: true },
  experience: { type: Sequelize.STRING, allowNull: true },
  height: { type: Sequelize.STRING, allowNull: true },
  weight: { type: Sequelize.STRING, allowNull: true },
  age: { type: Sequelize.STRING, allowNull: true },
  college: { type: Sequelize.STRING, allowNull: true },
  picture: { type: Sequelize.STRING, allowNull: true },
  fgm: { type: Sequelize.STRING, allowNull: true },
  fga: { type: Sequelize.STRING, allowNull: true },
  orbPct: { type: Sequelize.STRING, allowNull: true },
  astPct: { type: Sequelize.STRING, allowNull: true },
  tovPct: { type: Sequelize.STRING, allowNull: true },
  dws: { type: Sequelize.STRING, allowNull: true },
  obpm: { type: Sequelize.STRING, allowNull: true },
  vorp: { type: Sequelize.STRING, allowNull: true },
  injury: { type: Sequelize.STRING, allowNull: true },
  threePt: { type: Sequelize.STRING, allowNull: true },
  threePtAtt: { type: Sequelize.STRING, allowNull: true },
  twoPt: { type: Sequelize.STRING, allowNull: true },
  twoPtAtt: { type: Sequelize.STRING, allowNull: true },
  efgPct: { type: Sequelize.STRING, allowNull: true },
  ft: { type: Sequelize.STRING, allowNull: true },
  fta: { type: Sequelize.STRING, allowNull: true },
  drbPct: { type: Sequelize.STRING, allowNull: true },
  stlPct: { type: Sequelize.STRING, allowNull: true },
  usgPct: { type: Sequelize.STRING, allowNull: true },
  ws: { type: Sequelize.STRING, allowNull: true },
  dbpm: { type: Sequelize.STRING, allowNull: true },
  avgDistShot: { type: Sequelize.STRING, allowNull: true },
  number: { type: Sequelize.STRING, allowNull: true },
  orb: { type: Sequelize.STRING, allowNull: true },
  drb: { type: Sequelize.STRING, allowNull: true },
  pf: { type: Sequelize.STRING, allowNull: true },
  per: { type: Sequelize.STRING, allowNull: true },
  tsPct: { type: Sequelize.STRING, allowNull: true },
  threePAr: { type: Sequelize.STRING, allowNull: true },
  ftr: { type: Sequelize.STRING, allowNull: true },
  trbPct: { type: Sequelize.STRING, allowNull: true },
  blkPct: { type: Sequelize.STRING, allowNull: true },
  ows: { type: Sequelize.STRING, allowNull: true },
  wsFourtyEight: { type: Sequelize.STRING, allowNull: true },
  bpm: { type: Sequelize.STRING, allowNull: true },
  salary: { type: Sequelize.STRING, allowNull: true }
});

// PlayersNineteen.sync({ force: true }).then(() => {
//   return PlayersNineteen.bulkCreate([
//     { name: "Michael Griffin", position: "PG" }
//   ]);
// });
PlayersNineteen.sync();

const PlayersHistory = bbscoutdb.define("playerHistory", {
  name: { type: Sequelize.STRING, allowNull: false },
  year: { type: Sequelize.INTEGER, allowNull: false },
  position: { type: Sequelize.STRING, allowNull: true },
  team: { type: Sequelize.STRING, allowNull: true },
  mpg: { type: Sequelize.FLOAT, allowNull: true },
  gamesPlayed: { type: Sequelize.INTEGER, allowNull: true },
  twoPtPct: { type: Sequelize.FLOAT, allowNull: true },
  threePtPct: { type: Sequelize.FLOAT, allowNull: true },
  fgPct: { type: Sequelize.FLOAT, allowNull: true },
  freeThrowPct: { type: Sequelize.FLOAT, allowNull: true },
  trb: { type: Sequelize.FLOAT, allowNull: true },
  ast: { type: Sequelize.FLOAT, allowNull: true },
  pts: { type: Sequelize.FLOAT, allowNull: true },
  tov: { type: Sequelize.FLOAT, allowNull: true },
  stl: { type: Sequelize.FLOAT, allowNull: true },
  blk: { type: Sequelize.FLOAT, allowNull: true },
  plusMinus: { type: Sequelize.FLOAT, allowNull: true },
  draft: { type: Sequelize.STRING, allowNull: true },
  experience: { type: Sequelize.STRING, allowNull: true },
  height: { type: Sequelize.STRING, allowNull: true },
  weight: { type: Sequelize.STRING, allowNull: true },
  age: { type: Sequelize.STRING, allowNull: true },
  college: { type: Sequelize.STRING, allowNull: true },
  picture: { type: Sequelize.STRING, allowNull: true },
  fgm: { type: Sequelize.STRING, allowNull: true },
  fga: { type: Sequelize.STRING, allowNull: true },
  orbPct: { type: Sequelize.STRING, allowNull: true },
  astPct: { type: Sequelize.STRING, allowNull: true },
  tovPct: { type: Sequelize.STRING, allowNull: true },
  dws: { type: Sequelize.STRING, allowNull: true },
  obpm: { type: Sequelize.STRING, allowNull: true },
  vorp: { type: Sequelize.STRING, allowNull: true },
  injury: { type: Sequelize.STRING, allowNull: true },
  threePt: { type: Sequelize.STRING, allowNull: true },
  threePtAtt: { type: Sequelize.STRING, allowNull: true },
  twoPt: { type: Sequelize.STRING, allowNull: true },
  twoPtAtt: { type: Sequelize.STRING, allowNull: true },
  efgPct: { type: Sequelize.STRING, allowNull: true },
  ft: { type: Sequelize.STRING, allowNull: true },
  fta: { type: Sequelize.STRING, allowNull: true },
  drbPct: { type: Sequelize.STRING, allowNull: true },
  stlPct: { type: Sequelize.STRING, allowNull: true },
  usgPct: { type: Sequelize.STRING, allowNull: true },
  ws: { type: Sequelize.STRING, allowNull: true },
  dbpm: { type: Sequelize.STRING, allowNull: true },
  avgDistShot: { type: Sequelize.STRING, allowNull: true },
  number: { type: Sequelize.STRING, allowNull: true },
  orb: { type: Sequelize.STRING, allowNull: true },
  drb: { type: Sequelize.STRING, allowNull: true },
  pf: { type: Sequelize.STRING, allowNull: true },
  per: { type: Sequelize.STRING, allowNull: true },
  tsPct: { type: Sequelize.STRING, allowNull: true },
  threePAr: { type: Sequelize.STRING, allowNull: true },
  ftr: { type: Sequelize.STRING, allowNull: true },
  trbPct: { type: Sequelize.STRING, allowNull: true },
  blkPct: { type: Sequelize.STRING, allowNull: true },
  ows: { type: Sequelize.STRING, allowNull: true },
  wsFourtyEight: { type: Sequelize.STRING, allowNull: true },
  bpm: { type: Sequelize.STRING, allowNull: true },
  salary: { type: Sequelize.STRING, allowNull: true }
});

// PlayersHistory.sync({ force: true }).then(() => {
//   return PlayersHistory.bulkCreate([
//     { name: "Michael Griffin", position: "PG", year: 1933 }
//   ]);
// });
PlayersHistory.sync();

const CollegeTeams = bbscoutdb.define("cteam", {
  Name: { type: Sequelize.STRING, allowNull: false },
  GP: { type: Sequelize.STRING, allowNull: true },
  FG: { type: Sequelize.STRING, allowNull: true },
  FGA: { type: Sequelize.STRING, allowNull: true },
  FG_PCT: { type: Sequelize.STRING, allowNull: true },
  Three_Pointers: { type: Sequelize.STRING, allowNull: true },
  Three_Pointers_Att: { type: Sequelize.STRING, allowNull: true },
  Three_Pointers_Pct: { type: Sequelize.STRING, allowNull: true },
  Two_Pointers: { type: Sequelize.STRING, allowNull: true },
  Two_Pointers_Att: { type: Sequelize.STRING, allowNull: true },
  Two_Pointers_Pct: { type: Sequelize.STRING, allowNull: true },
  FTM: { type: Sequelize.STRING, allowNull: true },
  FTA: { type: Sequelize.STRING, allowNull: true },
  FT_PCT: { type: Sequelize.STRING, allowNull: true },
  ORB: { type: Sequelize.STRING, allowNull: true },
  DRB: { type: Sequelize.STRING, allowNull: true },
  TRB: { type: Sequelize.STRING, allowNull: true },
  AST: { type: Sequelize.STRING, allowNull: true },
  STL: { type: Sequelize.STRING, allowNull: true },
  BLK: { type: Sequelize.STRING, allowNull: true },
  TOV: { type: Sequelize.STRING, allowNull: true },
  PF: { type: Sequelize.STRING, allowNull: true },
  PTS: { type: Sequelize.STRING, allowNull: true },
  W: { type: Sequelize.STRING, allowNull: true },
  L: { type: Sequelize.STRING, allowNull: true },
  PW: { type: Sequelize.STRING, allowNull: true },
  PL: { type: Sequelize.STRING, allowNull: true },
  MOV: { type: Sequelize.STRING, allowNull: true },
  SOS: { type: Sequelize.STRING, allowNull: true },
  SRS: { type: Sequelize.STRING, allowNull: true },
  ORtg: { type: Sequelize.STRING, allowNull: true },
  DRtg: { type: Sequelize.STRING, allowNull: true },
  PACE: { type: Sequelize.STRING, allowNull: true },
  FTr: { type: Sequelize.STRING, allowNull: true },
  Three_PAr: { type: Sequelize.STRING, allowNull: true },
  OFF_eFG_PCT: { type: Sequelize.STRING, allowNull: true },
  OFF_TOV_PCT: { type: Sequelize.STRING, allowNull: true },
  ORB_PCT: { type: Sequelize.STRING, allowNull: true },
  OFF_FT_FGA: { type: Sequelize.STRING, allowNull: true },
  DEF_eFG_PCT: { type: Sequelize.STRING, allowNull: true },
  DEF_TOV_PCT: { type: Sequelize.STRING, allowNull: true },
  DRB_PCT: { type: Sequelize.STRING, allowNull: true },
  DEF_FT_FGA: { type: Sequelize.STRING, allowNull: true },
  oFG: { type: Sequelize.STRING, allowNull: true },
  oFGA: { type: Sequelize.STRING, allowNull: true },
  oFGPCT: { type: Sequelize.STRING, allowNull: true },
  o3P: { type: Sequelize.STRING, allowNull: true },
  o3PA: { type: Sequelize.STRING, allowNull: true },
  o3PCT: { type: Sequelize.STRING, allowNull: true },
  o2P: { type: Sequelize.STRING, allowNull: true },
  o2PA: { type: Sequelize.STRING, allowNull: true },
  o2PCT: { type: Sequelize.STRING, allowNull: true },
  oFTM: { type: Sequelize.STRING, allowNull: true },
  oFTA: { type: Sequelize.STRING, allowNull: true },
  oFTPCT: { type: Sequelize.STRING, allowNull: true },
  oORB: { type: Sequelize.STRING, allowNull: true },
  oDRB: { type: Sequelize.STRING, allowNull: true },
  oTRB: { type: Sequelize.STRING, allowNull: true },
  oAST: { type: Sequelize.STRING, allowNull: true },
  oSTL: { type: Sequelize.STRING, allowNull: true },
  oBLK: { type: Sequelize.STRING, allowNull: true },
  oTOV: { type: Sequelize.STRING, allowNull: true },
  oPF: { type: Sequelize.STRING, allowNull: true },
  oPTS: { type: Sequelize.STRING, allowNull: true },
  Logo: { type: Sequelize.STRING, allowNull: true },
  Color_Main: { type: Sequelize.STRING, allowNull: true },
  Color_Sec: { type: Sequelize.STRING, allowNull: true },
  Color_Third: { type: Sequelize.STRING, allowNull: true }
});

// CollegeTeams.sync({ force: true }).then(() => {
//   return CollegeTeams.bulkCreate([{ Name: "LA Griffins" }]);
// });
CollegeTeams.sync();

const PlayersFifteen = bbscoutdb.define("playerFifteen", {
  name: { type: Sequelize.STRING, allowNull: false },
  position: { type: Sequelize.STRING, allowNull: true },
  team: { type: Sequelize.STRING, allowNull: true },
  mpg: { type: Sequelize.FLOAT, allowNull: true },
  gamesPlayed: { type: Sequelize.INTEGER, allowNull: true },
  twoPtPct: { type: Sequelize.FLOAT, allowNull: true },
  threePtPct: { type: Sequelize.FLOAT, allowNull: true },
  fgPct: { type: Sequelize.FLOAT, allowNull: true },
  freeThrowPct: { type: Sequelize.FLOAT, allowNull: true },
  trb: { type: Sequelize.FLOAT, allowNull: true },
  ast: { type: Sequelize.FLOAT, allowNull: true },
  pts: { type: Sequelize.FLOAT, allowNull: true },
  tov: { type: Sequelize.FLOAT, allowNull: true },
  stl: { type: Sequelize.FLOAT, allowNull: true },
  blk: { type: Sequelize.FLOAT, allowNull: true },
  plusMinus: { type: Sequelize.FLOAT, allowNull: true },
  draft: { type: Sequelize.STRING, allowNull: true },
  experience: { type: Sequelize.STRING, allowNull: true },
  height: { type: Sequelize.STRING, allowNull: true },
  weight: { type: Sequelize.STRING, allowNull: true },
  age: { type: Sequelize.STRING, allowNull: true },
  college: { type: Sequelize.STRING, allowNull: true },
  picture: { type: Sequelize.STRING, allowNull: true },
  fgm: { type: Sequelize.STRING, allowNull: true },
  fga: { type: Sequelize.STRING, allowNull: true },
  orbPct: { type: Sequelize.STRING, allowNull: true },
  astPct: { type: Sequelize.STRING, allowNull: true },
  tovPct: { type: Sequelize.STRING, allowNull: true },
  dws: { type: Sequelize.STRING, allowNull: true },
  obpm: { type: Sequelize.STRING, allowNull: true },
  vorp: { type: Sequelize.STRING, allowNull: true },
  injury: { type: Sequelize.STRING, allowNull: true },
  threePt: { type: Sequelize.STRING, allowNull: true },
  threePtAtt: { type: Sequelize.STRING, allowNull: true },
  twoPt: { type: Sequelize.STRING, allowNull: true },
  twoPtAtt: { type: Sequelize.STRING, allowNull: true },
  efgPct: { type: Sequelize.STRING, allowNull: true },
  ft: { type: Sequelize.STRING, allowNull: true },
  fta: { type: Sequelize.STRING, allowNull: true },
  drbPct: { type: Sequelize.STRING, allowNull: true },
  stlPct: { type: Sequelize.STRING, allowNull: true },
  usgPct: { type: Sequelize.STRING, allowNull: true },
  ws: { type: Sequelize.STRING, allowNull: true },
  dbpm: { type: Sequelize.STRING, allowNull: true },
  avgDistShot: { type: Sequelize.STRING, allowNull: true },
  number: { type: Sequelize.STRING, allowNull: true },
  orb: { type: Sequelize.STRING, allowNull: true },
  drb: { type: Sequelize.STRING, allowNull: true },
  pf: { type: Sequelize.STRING, allowNull: true },
  per: { type: Sequelize.STRING, allowNull: true },
  tsPct: { type: Sequelize.STRING, allowNull: true },
  threePAr: { type: Sequelize.STRING, allowNull: true },
  ftr: { type: Sequelize.STRING, allowNull: true },
  trbPct: { type: Sequelize.STRING, allowNull: true },
  blkPct: { type: Sequelize.STRING, allowNull: true },
  ows: { type: Sequelize.STRING, allowNull: true },
  wsFourtyEight: { type: Sequelize.STRING, allowNull: true },
  bpm: { type: Sequelize.STRING, allowNull: true },
  salary: { type: Sequelize.STRING, allowNull: true }
});

// PlayersFifteen.sync({ force: true }).then(() => {
//   return PlayersFifteen.bulkCreate([
//     { name: "Michael Griffin", position: "PG" }
//   ]);
// });
PlayersFifteen.sync();

const PlayersSixteen = bbscoutdb.define("playerSixteen", {
  name: { type: Sequelize.STRING, allowNull: false },
  position: { type: Sequelize.STRING, allowNull: true },
  team: { type: Sequelize.STRING, allowNull: true },
  mpg: { type: Sequelize.FLOAT, allowNull: true },
  gamesPlayed: { type: Sequelize.INTEGER, allowNull: true },
  twoPtPct: { type: Sequelize.FLOAT, allowNull: true },
  threePtPct: { type: Sequelize.FLOAT, allowNull: true },
  fgPct: { type: Sequelize.FLOAT, allowNull: true },
  freeThrowPct: { type: Sequelize.FLOAT, allowNull: true },
  trb: { type: Sequelize.FLOAT, allowNull: true },
  ast: { type: Sequelize.FLOAT, allowNull: true },
  pts: { type: Sequelize.FLOAT, allowNull: true },
  tov: { type: Sequelize.FLOAT, allowNull: true },
  stl: { type: Sequelize.FLOAT, allowNull: true },
  blk: { type: Sequelize.FLOAT, allowNull: true },
  plusMinus: { type: Sequelize.FLOAT, allowNull: true },
  draft: { type: Sequelize.STRING, allowNull: true },
  experience: { type: Sequelize.STRING, allowNull: true },
  height: { type: Sequelize.STRING, allowNull: true },
  weight: { type: Sequelize.STRING, allowNull: true },
  age: { type: Sequelize.STRING, allowNull: true },
  college: { type: Sequelize.STRING, allowNull: true },
  picture: { type: Sequelize.STRING, allowNull: true },
  fgm: { type: Sequelize.STRING, allowNull: true },
  fga: { type: Sequelize.STRING, allowNull: true },
  orbPct: { type: Sequelize.STRING, allowNull: true },
  astPct: { type: Sequelize.STRING, allowNull: true },
  tovPct: { type: Sequelize.STRING, allowNull: true },
  dws: { type: Sequelize.STRING, allowNull: true },
  obpm: { type: Sequelize.STRING, allowNull: true },
  vorp: { type: Sequelize.STRING, allowNull: true },
  injury: { type: Sequelize.STRING, allowNull: true },
  threePt: { type: Sequelize.STRING, allowNull: true },
  threePtAtt: { type: Sequelize.STRING, allowNull: true },
  twoPt: { type: Sequelize.STRING, allowNull: true },
  twoPtAtt: { type: Sequelize.STRING, allowNull: true },
  efgPct: { type: Sequelize.STRING, allowNull: true },
  ft: { type: Sequelize.STRING, allowNull: true },
  fta: { type: Sequelize.STRING, allowNull: true },
  drbPct: { type: Sequelize.STRING, allowNull: true },
  stlPct: { type: Sequelize.STRING, allowNull: true },
  usgPct: { type: Sequelize.STRING, allowNull: true },
  ws: { type: Sequelize.STRING, allowNull: true },
  dbpm: { type: Sequelize.STRING, allowNull: true },
  avgDistShot: { type: Sequelize.STRING, allowNull: true },
  number: { type: Sequelize.STRING, allowNull: true },
  orb: { type: Sequelize.STRING, allowNull: true },
  drb: { type: Sequelize.STRING, allowNull: true },
  pf: { type: Sequelize.STRING, allowNull: true },
  per: { type: Sequelize.STRING, allowNull: true },
  tsPct: { type: Sequelize.STRING, allowNull: true },
  threePAr: { type: Sequelize.STRING, allowNull: true },
  ftr: { type: Sequelize.STRING, allowNull: true },
  trbPct: { type: Sequelize.STRING, allowNull: true },
  blkPct: { type: Sequelize.STRING, allowNull: true },
  ows: { type: Sequelize.STRING, allowNull: true },
  wsFourtyEight: { type: Sequelize.STRING, allowNull: true },
  bpm: { type: Sequelize.STRING, allowNull: true },
  salary: { type: Sequelize.STRING, allowNull: true }
});

// PlayersSixteen.sync({ force: true }).then(() => {
//   return PlayersSixteen.bulkCreate([
//     { name: "Michael Griffin", position: "PG" }
//   ]);
// });
PlayersSixteen.sync();

const PlayersSeventeen = bbscoutdb.define("playerSeventeen", {
  name: { type: Sequelize.STRING, allowNull: false },
  position: { type: Sequelize.STRING, allowNull: true },
  team: { type: Sequelize.STRING, allowNull: true },
  mpg: { type: Sequelize.FLOAT, allowNull: true },
  gamesPlayed: { type: Sequelize.INTEGER, allowNull: true },
  twoPtPct: { type: Sequelize.FLOAT, allowNull: true },
  threePtPct: { type: Sequelize.FLOAT, allowNull: true },
  fgPct: { type: Sequelize.FLOAT, allowNull: true },
  freeThrowPct: { type: Sequelize.FLOAT, allowNull: true },
  trb: { type: Sequelize.FLOAT, allowNull: true },
  ast: { type: Sequelize.FLOAT, allowNull: true },
  pts: { type: Sequelize.FLOAT, allowNull: true },
  tov: { type: Sequelize.FLOAT, allowNull: true },
  stl: { type: Sequelize.FLOAT, allowNull: true },
  blk: { type: Sequelize.FLOAT, allowNull: true },
  plusMinus: { type: Sequelize.FLOAT, allowNull: true },
  draft: { type: Sequelize.STRING, allowNull: true },
  experience: { type: Sequelize.STRING, allowNull: true },
  height: { type: Sequelize.STRING, allowNull: true },
  weight: { type: Sequelize.STRING, allowNull: true },
  age: { type: Sequelize.STRING, allowNull: true },
  college: { type: Sequelize.STRING, allowNull: true },
  picture: { type: Sequelize.STRING, allowNull: true },
  fgm: { type: Sequelize.STRING, allowNull: true },
  fga: { type: Sequelize.STRING, allowNull: true },
  orbPct: { type: Sequelize.STRING, allowNull: true },
  astPct: { type: Sequelize.STRING, allowNull: true },
  tovPct: { type: Sequelize.STRING, allowNull: true },
  dws: { type: Sequelize.STRING, allowNull: true },
  obpm: { type: Sequelize.STRING, allowNull: true },
  vorp: { type: Sequelize.STRING, allowNull: true },
  injury: { type: Sequelize.STRING, allowNull: true },
  threePt: { type: Sequelize.STRING, allowNull: true },
  threePtAtt: { type: Sequelize.STRING, allowNull: true },
  twoPt: { type: Sequelize.STRING, allowNull: true },
  twoPtAtt: { type: Sequelize.STRING, allowNull: true },
  efgPct: { type: Sequelize.STRING, allowNull: true },
  ft: { type: Sequelize.STRING, allowNull: true },
  fta: { type: Sequelize.STRING, allowNull: true },
  drbPct: { type: Sequelize.STRING, allowNull: true },
  stlPct: { type: Sequelize.STRING, allowNull: true },
  usgPct: { type: Sequelize.STRING, allowNull: true },
  ws: { type: Sequelize.STRING, allowNull: true },
  dbpm: { type: Sequelize.STRING, allowNull: true },
  avgDistShot: { type: Sequelize.STRING, allowNull: true },
  number: { type: Sequelize.STRING, allowNull: true },
  orb: { type: Sequelize.STRING, allowNull: true },
  drb: { type: Sequelize.STRING, allowNull: true },
  pf: { type: Sequelize.STRING, allowNull: true },
  per: { type: Sequelize.STRING, allowNull: true },
  tsPct: { type: Sequelize.STRING, allowNull: true },
  threePAr: { type: Sequelize.STRING, allowNull: true },
  ftr: { type: Sequelize.STRING, allowNull: true },
  trbPct: { type: Sequelize.STRING, allowNull: true },
  blkPct: { type: Sequelize.STRING, allowNull: true },
  ows: { type: Sequelize.STRING, allowNull: true },
  wsFourtyEight: { type: Sequelize.STRING, allowNull: true },
  bpm: { type: Sequelize.STRING, allowNull: true },
  salary: { type: Sequelize.STRING, allowNull: true }
});

// PlayersSeventeen.sync({ force: true }).then(() => {
//   return PlayersSeventeen.bulkCreate([
//     { name: "Michael Griffin", position: "PG" }
//   ]);
// });
PlayersSeventeen.sync();
// ************************************************
// NBA MODELS
// ************************************************

const Players = db.define("player", {
  name: { type: Sequelize.STRING, allowNull: false },
  position: { type: Sequelize.STRING, allowNull: false },
  team: { type: Sequelize.STRING, allowNull: true },
  mpg: { type: Sequelize.FLOAT, allowNull: true },
  gamesPlayed: { type: Sequelize.INTEGER, allowNull: true },
  twoPtPct: { type: Sequelize.FLOAT, allowNull: true },
  threePtPct: { type: Sequelize.FLOAT, allowNull: true },
  fgPct: { type: Sequelize.FLOAT, allowNull: true },
  freeThrowPct: { type: Sequelize.FLOAT, allowNull: true },
  trb: { type: Sequelize.FLOAT, allowNull: true },
  ast: { type: Sequelize.FLOAT, allowNull: true },
  pts: { type: Sequelize.FLOAT, allowNull: true },
  tov: { type: Sequelize.FLOAT, allowNull: true },
  stl: { type: Sequelize.FLOAT, allowNull: true },
  blk: { type: Sequelize.FLOAT, allowNull: true },
  plusMinus: { type: Sequelize.FLOAT, allowNull: true },
  draft: { type: Sequelize.STRING, allowNull: true },
  experience: { type: Sequelize.STRING, allowNull: true },
  height: { type: Sequelize.STRING, allowNull: true },
  weight: { type: Sequelize.STRING, allowNull: true },
  age: { type: Sequelize.STRING, allowNull: true },
  college: { type: Sequelize.STRING, allowNull: true },
  picture: { type: Sequelize.STRING, allowNull: true },
  fgm: { type: Sequelize.STRING, allowNull: true },
  fga: { type: Sequelize.STRING, allowNull: true },
  orbPct: { type: Sequelize.STRING, allowNull: true },
  astPct: { type: Sequelize.STRING, allowNull: true },
  tovPct: { type: Sequelize.STRING, allowNull: true },
  dws: { type: Sequelize.STRING, allowNull: true },
  obpm: { type: Sequelize.STRING, allowNull: true },
  vorp: { type: Sequelize.STRING, allowNull: true },
  injury: { type: Sequelize.STRING, allowNull: true },
  threePt: { type: Sequelize.STRING, allowNull: true },
  threePtAtt: { type: Sequelize.STRING, allowNull: true },
  twoPt: { type: Sequelize.STRING, allowNull: true },
  twoPtAtt: { type: Sequelize.STRING, allowNull: true },
  efgPct: { type: Sequelize.STRING, allowNull: true },
  ft: { type: Sequelize.STRING, allowNull: true },
  fta: { type: Sequelize.STRING, allowNull: true },
  drbPct: { type: Sequelize.STRING, allowNull: true },
  stlPct: { type: Sequelize.STRING, allowNull: true },
  usgPct: { type: Sequelize.STRING, allowNull: true },
  ws: { type: Sequelize.STRING, allowNull: true },
  dbpm: { type: Sequelize.STRING, allowNull: true },
  avgDistShot: { type: Sequelize.STRING, allowNull: true },
  number: { type: Sequelize.STRING, allowNull: true },
  orb: { type: Sequelize.STRING, allowNull: true },
  drb: { type: Sequelize.STRING, allowNull: true },
  pf: { type: Sequelize.STRING, allowNull: true },
  per: { type: Sequelize.STRING, allowNull: true },
  tsPct: { type: Sequelize.STRING, allowNull: true },
  threePAr: { type: Sequelize.STRING, allowNull: true },
  ftr: { type: Sequelize.STRING, allowNull: true },
  trbPct: { type: Sequelize.STRING, allowNull: true },
  blkPct: { type: Sequelize.STRING, allowNull: true },
  ows: { type: Sequelize.STRING, allowNull: true },
  wsFourtyEight: { type: Sequelize.STRING, allowNull: true },
  bpm: { type: Sequelize.STRING, allowNull: true },
  salary: { type: Sequelize.STRING, allowNull: true }
});

const Salaries = salariesdb.define("salary", {
  name: { type: Sequelize.STRING, allowNull: false },
  team: { type: Sequelize.STRING, allowNull: true },
  age: { type: Sequelize.STRING, allowNull: true },
  guaranteed: { type: Sequelize.STRING, allowNull: true },
  signedUsing: { type: Sequelize.STRING, allowNull: true },
  yearOne: { type: Sequelize.STRING, allowNull: true },
  yearTwo: { type: Sequelize.STRING, allowNull: true },
  yearThird: { type: Sequelize.STRING, allowNull: true },
  yearFour: { type: Sequelize.STRING, allowNull: true },
  yearFive: { type: Sequelize.STRING, allowNull: true },
  yearSix: { type: Sequelize.STRING, allowNull: true },
  yearOneOption: { type: Sequelize.STRING, allowNull: true },
  yearTwoOption: { type: Sequelize.STRING, allowNull: true },
  yearThirdOption: { type: Sequelize.STRING, allowNull: true },
  yearFourOption: { type: Sequelize.STRING, allowNull: true },
  yearFiveOption: { type: Sequelize.STRING, allowNull: true },
  yearSixOption: { type: Sequelize.STRING, allowNull: true },
  notes: { type: Sequelize.STRING, allowNull: true }
});

const PostUp = tracking1db.define("postUp", {
  name: { type: Sequelize.STRING, allowNull: false },
  touches: { type: Sequelize.FLOAT, allowNull: true },
  postUps: { type: Sequelize.FLOAT, allowNull: true },
  fgm: { type: Sequelize.FLOAT, allowNull: true },
  fga: { type: Sequelize.FLOAT, allowNull: true },
  fgPct: { type: Sequelize.FLOAT, allowNull: true },
  ftm: { type: Sequelize.FLOAT, allowNull: true },
  fta: { type: Sequelize.FLOAT, allowNull: true },
  ftPct: { type: Sequelize.FLOAT, allowNull: true },
  pts: { type: Sequelize.FLOAT, allowNull: true },
  ptsPct: { type: Sequelize.FLOAT, allowNull: true },
  pass: { type: Sequelize.FLOAT, allowNull: true },
  passPct: { type: Sequelize.FLOAT, allowNull: true },
  ast: { type: Sequelize.FLOAT, allowNull: true },
  astPct: { type: Sequelize.FLOAT, allowNull: true },
  tov: { type: Sequelize.FLOAT, allowNull: true },
  tovPct: { type: Sequelize.FLOAT, allowNull: true },
  pf: { type: Sequelize.FLOAT, allowNull: true },
  pfPct: { type: Sequelize.FLOAT, allowNull: true }
});

const Shooting = tracking3db.define("shooting", {
  name: { type: Sequelize.STRING, allowNull: false },
  drPts: { type: Sequelize.FLOAT, allowNull: true },
  drPct: { type: Sequelize.FLOAT, allowNull: true },
  catchPts: { type: Sequelize.FLOAT, allowNull: true },
  catchPct: { type: Sequelize.FLOAT, allowNull: true },
  pullPts: { type: Sequelize.FLOAT, allowNull: true },
  pullPct: { type: Sequelize.FLOAT, allowNull: true },
  paintPts: { type: Sequelize.FLOAT, allowNull: true },
  paintPct: { type: Sequelize.FLOAT, allowNull: true },
  postPts: { type: Sequelize.FLOAT, allowNull: true },
  postPct: { type: Sequelize.FLOAT, allowNull: true },
  elbowPts: { type: Sequelize.FLOAT, allowNull: true },
  elbowPct: { type: Sequelize.FLOAT, allowNull: true },
  efgPct: { type: Sequelize.FLOAT, allowNull: true }
});

const CatchShoot = tracking2db.define("catchShoot", {
  name: { type: Sequelize.STRING, allowNull: false },
  pts: { type: Sequelize.FLOAT, allowNull: true },
  fgm: { type: Sequelize.FLOAT, allowNull: true },
  fga: { type: Sequelize.FLOAT, allowNull: true },
  fgPct: { type: Sequelize.FLOAT, allowNull: true },
  threePt: { type: Sequelize.FLOAT, allowNull: true },
  threePtAtt: { type: Sequelize.FLOAT, allowNull: true },
  threePtPct: { type: Sequelize.FLOAT, allowNull: true },
  efgPct: { type: Sequelize.FLOAT, allowNull: true }
});

const SpeedDistance = tracking4db.define("speedDistance", {
  name: { type: Sequelize.STRING, allowNull: false },
  distMiles: { type: Sequelize.FLOAT, allowNull: true },
  distMilesOff: { type: Sequelize.FLOAT, allowNull: true },
  distMilesDef: { type: Sequelize.FLOAT, allowNull: true },
  avgSpeed: { type: Sequelize.FLOAT, allowNull: true },
  avgSpeedOff: { type: Sequelize.FLOAT, allowNull: true },
  avgSpeedDef: { type: Sequelize.FLOAT, allowNull: true }
});

const PRBallHandler = tracking5db.define("prBallHandler", {
  name: { type: Sequelize.STRING, allowNull: false },
  freq: { type: Sequelize.FLOAT, allowNull: true },
  ppp: { type: Sequelize.FLOAT, allowNull: true },
  pts: { type: Sequelize.FLOAT, allowNull: true },
  efg: { type: Sequelize.FLOAT, allowNull: true },
  scoreFreq: { type: Sequelize.FLOAT, allowNull: true },
  toFreq: { type: Sequelize.FLOAT, allowNull: true },
  ftFreq: { type: Sequelize.FLOAT, allowNull: true },
  fga: { type: Sequelize.FLOAT, allowNull: true }
});

const PRRollMan = tracking6db.define("prRollMan", {
  name: { type: Sequelize.STRING, allowNull: false },
  freq: { type: Sequelize.FLOAT, allowNull: true },
  ppp: { type: Sequelize.FLOAT, allowNull: true },
  pts: { type: Sequelize.FLOAT, allowNull: true },
  efg: { type: Sequelize.FLOAT, allowNull: true },
  scoreFreq: { type: Sequelize.FLOAT, allowNull: true },
  toFreq: { type: Sequelize.FLOAT, allowNull: true },
  ftFreq: { type: Sequelize.FLOAT, allowNull: true },
  fga: { type: Sequelize.FLOAT, allowNull: true }
});

const Isolation = tracking7db.define("isolation", {
  name: { type: Sequelize.STRING, allowNull: false },
  freq: { type: Sequelize.FLOAT, allowNull: true },
  ppp: { type: Sequelize.FLOAT, allowNull: true },
  pts: { type: Sequelize.FLOAT, allowNull: true },
  efg: { type: Sequelize.FLOAT, allowNull: true },
  scoreFreq: { type: Sequelize.FLOAT, allowNull: true },
  toFreq: { type: Sequelize.FLOAT, allowNull: true },
  ftFreq: { type: Sequelize.FLOAT, allowNull: true },
  fga: { type: Sequelize.FLOAT, allowNull: true }
});

const Transition = tracking9db.define("transition", {
  name: { type: Sequelize.STRING, allowNull: false },
  freq: { type: Sequelize.FLOAT, allowNull: true },
  ppp: { type: Sequelize.FLOAT, allowNull: true },
  pts: { type: Sequelize.FLOAT, allowNull: true },
  efg: { type: Sequelize.FLOAT, allowNull: true },
  scoreFreq: { type: Sequelize.FLOAT, allowNull: true },
  toFreq: { type: Sequelize.FLOAT, allowNull: true },
  ftFreq: { type: Sequelize.FLOAT, allowNull: true },
  fga: { type: Sequelize.FLOAT, allowNull: true }
});

const Hustle = tracking8db.define("hustle", {
  name: { type: Sequelize.STRING, allowNull: false },
  gp: { type: Sequelize.FLOAT, allowNull: true },
  screenAst: { type: Sequelize.FLOAT, allowNull: true },
  deflections: { type: Sequelize.FLOAT, allowNull: true },
  looseBallRec: { type: Sequelize.FLOAT, allowNull: true },
  chargesDrawn: { type: Sequelize.FLOAT, allowNull: true },
  contestedTwo: { type: Sequelize.FLOAT, allowNull: true },
  contestedThree: { type: Sequelize.FLOAT, allowNull: true },
  contestedShots: { type: Sequelize.FLOAT, allowNull: true }
});

const Teams = db.define("team", {
  Name: { type: Sequelize.STRING, allowNull: true },
  GP: { type: Sequelize.STRING, allowNull: true },
  FG: { type: Sequelize.STRING, allowNull: true },
  FGA: { type: Sequelize.STRING, allowNull: true },
  FG_PCT: { type: Sequelize.STRING, allowNull: true },
  Three_Pointers: { type: Sequelize.STRING, allowNull: true },
  Three_Pointers_Att: { type: Sequelize.STRING, allowNull: true },
  Three_Pointers_Pct: { type: Sequelize.STRING, allowNull: true },
  Two_Pointers: { type: Sequelize.STRING, allowNull: true },
  Two_Pointers_Att: { type: Sequelize.STRING, allowNull: true },
  Two_Pointers_Pct: { type: Sequelize.STRING, allowNull: true },
  FTM: { type: Sequelize.STRING, allowNull: true },
  FTA: { type: Sequelize.STRING, allowNull: true },
  FT_PCT: { type: Sequelize.STRING, allowNull: true },
  ORB: { type: Sequelize.STRING, allowNull: true },
  DRB: { type: Sequelize.STRING, allowNull: true },
  TRB: { type: Sequelize.STRING, allowNull: true },
  AST: { type: Sequelize.STRING, allowNull: true },
  STL: { type: Sequelize.STRING, allowNull: true },
  BLK: { type: Sequelize.STRING, allowNull: true },
  TOV: { type: Sequelize.STRING, allowNull: true },
  PF: { type: Sequelize.STRING, allowNull: true },
  PTS: { type: Sequelize.STRING, allowNull: true },
  W: { type: Sequelize.STRING, allowNull: true },
  L: { type: Sequelize.STRING, allowNull: true },
  PW: { type: Sequelize.STRING, allowNull: true },
  PL: { type: Sequelize.STRING, allowNull: true },
  MOV: { type: Sequelize.STRING, allowNull: true },
  SOS: { type: Sequelize.STRING, allowNull: true },
  SRS: { type: Sequelize.STRING, allowNull: true },
  ORtg: { type: Sequelize.STRING, allowNull: true },
  DRtg: { type: Sequelize.STRING, allowNull: true },
  PACE: { type: Sequelize.STRING, allowNull: true },
  FTr: { type: Sequelize.STRING, allowNull: true },
  Three_PAr: { type: Sequelize.STRING, allowNull: true },
  OFF_eFG_PCT: { type: Sequelize.STRING, allowNull: true },
  OFF_TOV_PCT: { type: Sequelize.STRING, allowNull: true },
  ORB_PCT: { type: Sequelize.STRING, allowNull: true },
  OFF_FT_FGA: { type: Sequelize.STRING, allowNull: true },
  DEF_eFG_PCT: { type: Sequelize.STRING, allowNull: true },
  DEF_TOV_PCT: { type: Sequelize.STRING, allowNull: true },
  DRB_PCT: { type: Sequelize.STRING, allowNull: true },
  DEF_FT_FGA: { type: Sequelize.STRING, allowNull: true },
  oFG: { type: Sequelize.STRING, allowNull: true },
  oFGA: { type: Sequelize.STRING, allowNull: true },
  oFGPCT: { type: Sequelize.STRING, allowNull: true },
  o3P: { type: Sequelize.STRING, allowNull: true },
  o3PA: { type: Sequelize.STRING, allowNull: true },
  o3PCT: { type: Sequelize.STRING, allowNull: true },
  o2P: { type: Sequelize.STRING, allowNull: true },
  o2PA: { type: Sequelize.STRING, allowNull: true },
  o2PCT: { type: Sequelize.STRING, allowNull: true },
  oFTM: { type: Sequelize.STRING, allowNull: true },
  oFTA: { type: Sequelize.STRING, allowNull: true },
  oFTPCT: { type: Sequelize.STRING, allowNull: true },
  oORB: { type: Sequelize.STRING, allowNull: true },
  oDRB: { type: Sequelize.STRING, allowNull: true },
  oTRB: { type: Sequelize.STRING, allowNull: true },
  oAST: { type: Sequelize.STRING, allowNull: true },
  oSTL: { type: Sequelize.STRING, allowNull: true },
  oBLK: { type: Sequelize.STRING, allowNull: true },
  oTOV: { type: Sequelize.STRING, allowNull: true },
  oPF: { type: Sequelize.STRING, allowNull: true },
  oPTS: { type: Sequelize.STRING, allowNull: true },
  Logo: { type: Sequelize.STRING, allowNull: true },
  Color_Main: { type: Sequelize.STRING, allowNull: true },
  Color_Sec: { type: Sequelize.STRING, allowNull: true },
  Color_Third: { type: Sequelize.STRING, allowNull: true }
});

// *************************************************
// GLEAGUE MODEL
// *************************************************
const gPlayers = gleaguedb.define("player", {
  name: { type: Sequelize.STRING, allowNull: false },
  position: { type: Sequelize.STRING, allowNull: true },
  team: { type: Sequelize.STRING, allowNull: true },
  mpg: { type: Sequelize.FLOAT, allowNull: true },
  gamesPlayed: { type: Sequelize.INTEGER, allowNull: true },
  twoPtPct: { type: Sequelize.FLOAT, allowNull: true },
  threePtPct: { type: Sequelize.FLOAT, allowNull: true },
  fgPct: { type: Sequelize.FLOAT, allowNull: true },
  freeThrowPct: { type: Sequelize.FLOAT, allowNull: true },
  trb: { type: Sequelize.FLOAT, allowNull: true },
  ast: { type: Sequelize.FLOAT, allowNull: true },
  pts: { type: Sequelize.FLOAT, allowNull: true },
  tov: { type: Sequelize.FLOAT, allowNull: true },
  stl: { type: Sequelize.FLOAT, allowNull: true },
  blk: { type: Sequelize.FLOAT, allowNull: true },
  plusMinus: { type: Sequelize.FLOAT, allowNull: true },
  draft: { type: Sequelize.STRING, allowNull: true },
  experience: { type: Sequelize.STRING, allowNull: true },
  height: { type: Sequelize.STRING, allowNull: true },
  weight: { type: Sequelize.STRING, allowNull: true },
  age: { type: Sequelize.STRING, allowNull: true },
  college: { type: Sequelize.STRING, allowNull: true },
  picture: { type: Sequelize.STRING, allowNull: true },
  fgm: { type: Sequelize.STRING, allowNull: true },
  fga: { type: Sequelize.STRING, allowNull: true },
  orbPct: { type: Sequelize.STRING, allowNull: true },
  astPct: { type: Sequelize.STRING, allowNull: true },
  tovPct: { type: Sequelize.STRING, allowNull: true },
  dws: { type: Sequelize.STRING, allowNull: true },
  obpm: { type: Sequelize.STRING, allowNull: true },
  vorp: { type: Sequelize.STRING, allowNull: true },
  injury: { type: Sequelize.STRING, allowNull: true },
  threePt: { type: Sequelize.STRING, allowNull: true },
  threePtAtt: { type: Sequelize.STRING, allowNull: true },
  twoPt: { type: Sequelize.STRING, allowNull: true },
  twoPtAtt: { type: Sequelize.STRING, allowNull: true },
  efgPct: { type: Sequelize.STRING, allowNull: true },
  ft: { type: Sequelize.STRING, allowNull: true },
  fta: { type: Sequelize.STRING, allowNull: true },
  drbPct: { type: Sequelize.STRING, allowNull: true },
  stlPct: { type: Sequelize.STRING, allowNull: true },
  usgPct: { type: Sequelize.STRING, allowNull: true },
  ws: { type: Sequelize.STRING, allowNull: true },
  dbpm: { type: Sequelize.STRING, allowNull: true },
  avgDistShot: { type: Sequelize.STRING, allowNull: true },
  number: { type: Sequelize.STRING, allowNull: true },
  orb: { type: Sequelize.STRING, allowNull: true },
  drb: { type: Sequelize.STRING, allowNull: true },
  pf: { type: Sequelize.STRING, allowNull: true },
  per: { type: Sequelize.STRING, allowNull: true },
  tsPct: { type: Sequelize.STRING, allowNull: true },
  threePAr: { type: Sequelize.STRING, allowNull: true },
  ftr: { type: Sequelize.STRING, allowNull: true },
  trbPct: { type: Sequelize.STRING, allowNull: true },
  blkPct: { type: Sequelize.STRING, allowNull: true },
  ows: { type: Sequelize.STRING, allowNull: true },
  wsFourtyEight: { type: Sequelize.STRING, allowNull: true },
  bpm: { type: Sequelize.STRING, allowNull: true }
});

const gTeams = gleaguedb.define("gteam", {
  Name: { type: Sequelize.STRING, allowNull: false },
  GP: { type: Sequelize.STRING, allowNull: true },
  FG: { type: Sequelize.STRING, allowNull: true },
  FGA: { type: Sequelize.STRING, allowNull: true },
  FG_PCT: { type: Sequelize.STRING, allowNull: true },
  Three_Pointers: { type: Sequelize.STRING, allowNull: true },
  Three_Pointers_Att: { type: Sequelize.STRING, allowNull: true },
  Three_Pointers_Pct: { type: Sequelize.STRING, allowNull: true },
  Two_Pointers: { type: Sequelize.STRING, allowNull: true },
  Two_Pointers_Att: { type: Sequelize.STRING, allowNull: true },
  Two_Pointers_Pct: { type: Sequelize.STRING, allowNull: true },
  FTM: { type: Sequelize.STRING, allowNull: true },
  FTA: { type: Sequelize.STRING, allowNull: true },
  FT_PCT: { type: Sequelize.STRING, allowNull: true },
  ORB: { type: Sequelize.STRING, allowNull: true },
  DRB: { type: Sequelize.STRING, allowNull: true },
  TRB: { type: Sequelize.STRING, allowNull: true },
  AST: { type: Sequelize.STRING, allowNull: true },
  STL: { type: Sequelize.STRING, allowNull: true },
  BLK: { type: Sequelize.STRING, allowNull: true },
  TOV: { type: Sequelize.STRING, allowNull: true },
  PF: { type: Sequelize.STRING, allowNull: true },
  PTS: { type: Sequelize.STRING, allowNull: true },
  W: { type: Sequelize.STRING, allowNull: true },
  L: { type: Sequelize.STRING, allowNull: true },
  PW: { type: Sequelize.STRING, allowNull: true },
  PL: { type: Sequelize.STRING, allowNull: true },
  MOV: { type: Sequelize.STRING, allowNull: true },
  SOS: { type: Sequelize.STRING, allowNull: true },
  SRS: { type: Sequelize.STRING, allowNull: true },
  ORtg: { type: Sequelize.STRING, allowNull: true },
  DRtg: { type: Sequelize.STRING, allowNull: true },
  PACE: { type: Sequelize.STRING, allowNull: true },
  FTr: { type: Sequelize.STRING, allowNull: true },
  Three_PAr: { type: Sequelize.STRING, allowNull: true },
  OFF_eFG_PCT: { type: Sequelize.STRING, allowNull: true },
  OFF_TOV_PCT: { type: Sequelize.STRING, allowNull: true },
  ORB_PCT: { type: Sequelize.STRING, allowNull: true },
  OFF_FT_FGA: { type: Sequelize.STRING, allowNull: true },
  DEF_eFG_PCT: { type: Sequelize.STRING, allowNull: true },
  DEF_TOV_PCT: { type: Sequelize.STRING, allowNull: true },
  DRB_PCT: { type: Sequelize.STRING, allowNull: true },
  DEF_FT_FGA: { type: Sequelize.STRING, allowNull: true },
  oFG: { type: Sequelize.STRING, allowNull: true },
  oFGA: { type: Sequelize.STRING, allowNull: true },
  oFGPCT: { type: Sequelize.STRING, allowNull: true },
  o3P: { type: Sequelize.STRING, allowNull: true },
  o3PA: { type: Sequelize.STRING, allowNull: true },
  o3PCT: { type: Sequelize.STRING, allowNull: true },
  o2P: { type: Sequelize.STRING, allowNull: true },
  o2PA: { type: Sequelize.STRING, allowNull: true },
  o2PCT: { type: Sequelize.STRING, allowNull: true },
  oFTM: { type: Sequelize.STRING, allowNull: true },
  oFTA: { type: Sequelize.STRING, allowNull: true },
  oFTPCT: { type: Sequelize.STRING, allowNull: true },
  oORB: { type: Sequelize.STRING, allowNull: true },
  oDRB: { type: Sequelize.STRING, allowNull: true },
  oTRB: { type: Sequelize.STRING, allowNull: true },
  oAST: { type: Sequelize.STRING, allowNull: true },
  oSTL: { type: Sequelize.STRING, allowNull: true },
  oBLK: { type: Sequelize.STRING, allowNull: true },
  oTOV: { type: Sequelize.STRING, allowNull: true },
  oPF: { type: Sequelize.STRING, allowNull: true },
  oPTS: { type: Sequelize.STRING, allowNull: true },
  Logo: { type: Sequelize.STRING, allowNull: true },
  Color_Main: { type: Sequelize.STRING, allowNull: true },
  Color_Sec: { type: Sequelize.STRING, allowNull: true },
  Color_Third: { type: Sequelize.STRING, allowNull: true }
});

// *************************************************
// COLLEGE MODEL
// *************************************************
const cPlayers = cdb.define("player", {
  name: { type: Sequelize.STRING, allowNull: false },
  position: { type: Sequelize.STRING, allowNull: false },
  team: { type: Sequelize.STRING, allowNull: true },
  mpg: { type: Sequelize.FLOAT, allowNull: true },
  gamesPlayed: { type: Sequelize.INTEGER, allowNull: true },
  twoPtPct: { type: Sequelize.FLOAT, allowNull: true },
  threePtPct: { type: Sequelize.FLOAT, allowNull: true },
  fgPct: { type: Sequelize.FLOAT, allowNull: true },
  freeThrowPct: { type: Sequelize.FLOAT, allowNull: true },
  trb: { type: Sequelize.FLOAT, allowNull: true },
  ast: { type: Sequelize.FLOAT, allowNull: true },
  pts: { type: Sequelize.FLOAT, allowNull: true },
  tov: { type: Sequelize.FLOAT, allowNull: true },
  stl: { type: Sequelize.FLOAT, allowNull: true },
  blk: { type: Sequelize.FLOAT, allowNull: true },
  plusMinus: { type: Sequelize.FLOAT, allowNull: true },
  class: { type: Sequelize.STRING, allowNull: true },
  height: { type: Sequelize.STRING, allowNull: true },
  weight: { type: Sequelize.STRING, allowNull: true },
  age: { type: Sequelize.STRING, allowNull: true },
  picture: { type: Sequelize.STRING, allowNull: true },
  fgm: { type: Sequelize.STRING, allowNull: true },
  fga: { type: Sequelize.STRING, allowNull: true },
  orbPct: { type: Sequelize.STRING, allowNull: true },
  astPct: { type: Sequelize.STRING, allowNull: true },
  tovPct: { type: Sequelize.STRING, allowNull: true },
  dws: { type: Sequelize.STRING, allowNull: true },
  obpm: { type: Sequelize.STRING, allowNull: true },
  vorp: { type: Sequelize.STRING, allowNull: true },
  injury: { type: Sequelize.STRING, allowNull: true },
  threePt: { type: Sequelize.STRING, allowNull: true },
  threePtAtt: { type: Sequelize.STRING, allowNull: true },
  twoPt: { type: Sequelize.STRING, allowNull: true },
  twoPtAtt: { type: Sequelize.STRING, allowNull: true },
  efgPct: { type: Sequelize.STRING, allowNull: true },
  ft: { type: Sequelize.STRING, allowNull: true },
  fta: { type: Sequelize.STRING, allowNull: true },
  drbPct: { type: Sequelize.STRING, allowNull: true },
  stlPct: { type: Sequelize.STRING, allowNull: true },
  usgPct: { type: Sequelize.STRING, allowNull: true },
  ws: { type: Sequelize.STRING, allowNull: true },
  dbpm: { type: Sequelize.STRING, allowNull: true },
  avgDistShot: { type: Sequelize.STRING, allowNull: true },
  number: { type: Sequelize.STRING, allowNull: true },
  orb: { type: Sequelize.STRING, allowNull: true },
  drb: { type: Sequelize.STRING, allowNull: true },
  pf: { type: Sequelize.STRING, allowNull: true },
  per: { type: Sequelize.STRING, allowNull: true },
  tsPct: { type: Sequelize.STRING, allowNull: true },
  threePAr: { type: Sequelize.STRING, allowNull: true },
  ftr: { type: Sequelize.STRING, allowNull: true },
  trbPct: { type: Sequelize.STRING, allowNull: true },
  blkPct: { type: Sequelize.STRING, allowNull: true },
  ows: { type: Sequelize.STRING, allowNull: true },
  wsFourtyEight: { type: Sequelize.STRING, allowNull: true },
  bpm: { type: Sequelize.STRING, allowNull: true },
  hometown: { type: Sequelize.STRING, allowNull: true },
  highschool: { type: Sequelize.STRING, allowNull: true }
});

const cTeams = cdb.define("team", {
  Name: { type: Sequelize.STRING, allowNull: true },
  GP: { type: Sequelize.STRING, allowNull: true },
  FG: { type: Sequelize.STRING, allowNull: true },
  FGA: { type: Sequelize.STRING, allowNull: true },
  FG_PCT: { type: Sequelize.STRING, allowNull: true },
  Three_Pointers: { type: Sequelize.STRING, allowNull: true },
  Three_Pointers_Att: { type: Sequelize.STRING, allowNull: true },
  Three_Pointers_Pct: { type: Sequelize.STRING, allowNull: true },
  Two_Pointers: { type: Sequelize.STRING, allowNull: true },
  Two_Pointers_Att: { type: Sequelize.STRING, allowNull: true },
  Two_Pointers_Pct: { type: Sequelize.STRING, allowNull: true },
  FTM: { type: Sequelize.STRING, allowNull: true },
  FTA: { type: Sequelize.STRING, allowNull: true },
  FT_PCT: { type: Sequelize.STRING, allowNull: true },
  ORB: { type: Sequelize.STRING, allowNull: true },
  DRB: { type: Sequelize.STRING, allowNull: true },
  TRB: { type: Sequelize.STRING, allowNull: true },
  AST: { type: Sequelize.STRING, allowNull: true },
  STL: { type: Sequelize.STRING, allowNull: true },
  BLK: { type: Sequelize.STRING, allowNull: true },
  TOV: { type: Sequelize.STRING, allowNull: true },
  PF: { type: Sequelize.STRING, allowNull: true },
  PTS: { type: Sequelize.STRING, allowNull: true },
  W: { type: Sequelize.STRING, allowNull: true },
  L: { type: Sequelize.STRING, allowNull: true },
  PW: { type: Sequelize.STRING, allowNull: true },
  PL: { type: Sequelize.STRING, allowNull: true },
  MOV: { type: Sequelize.STRING, allowNull: true },
  SOS: { type: Sequelize.STRING, allowNull: true },
  SRS: { type: Sequelize.STRING, allowNull: true },
  ORtg: { type: Sequelize.STRING, allowNull: true },
  DRtg: { type: Sequelize.STRING, allowNull: true },
  PACE: { type: Sequelize.STRING, allowNull: true },
  FTr: { type: Sequelize.STRING, allowNull: true },
  Three_PAr: { type: Sequelize.STRING, allowNull: true },
  OFF_eFG_PCT: { type: Sequelize.STRING, allowNull: true },
  OFF_TOV_PCT: { type: Sequelize.STRING, allowNull: true },
  ORB_PCT: { type: Sequelize.STRING, allowNull: true },
  OFF_FT_FGA: { type: Sequelize.STRING, allowNull: true },
  DEF_eFG_PCT: { type: Sequelize.STRING, allowNull: true },
  DEF_TOV_PCT: { type: Sequelize.STRING, allowNull: true },
  DRB_PCT: { type: Sequelize.STRING, allowNull: true },
  DEF_FT_FGA: { type: Sequelize.STRING, allowNull: true },
  oFG: { type: Sequelize.STRING, allowNull: true },
  oFGA: { type: Sequelize.STRING, allowNull: true },
  oFGPCT: { type: Sequelize.STRING, allowNull: true },
  o3P: { type: Sequelize.STRING, allowNull: true },
  o3PA: { type: Sequelize.STRING, allowNull: true },
  o3PCT: { type: Sequelize.STRING, allowNull: true },
  o2P: { type: Sequelize.STRING, allowNull: true },
  o2PA: { type: Sequelize.STRING, allowNull: true },
  o2PCT: { type: Sequelize.STRING, allowNull: true },
  oFTM: { type: Sequelize.STRING, allowNull: true },
  oFTA: { type: Sequelize.STRING, allowNull: true },
  oFTPCT: { type: Sequelize.STRING, allowNull: true },
  oORB: { type: Sequelize.STRING, allowNull: true },
  oDRB: { type: Sequelize.STRING, allowNull: true },
  oTRB: { type: Sequelize.STRING, allowNull: true },
  oAST: { type: Sequelize.STRING, allowNull: true },
  oSTL: { type: Sequelize.STRING, allowNull: true },
  oBLK: { type: Sequelize.STRING, allowNull: true },
  oTOV: { type: Sequelize.STRING, allowNull: true },
  oPF: { type: Sequelize.STRING, allowNull: true },
  oPTS: { type: Sequelize.STRING, allowNull: true },
  Logo: { type: Sequelize.STRING, allowNull: true },
  Color_Main: { type: Sequelize.STRING, allowNull: true },
  Color_Sec: { type: Sequelize.STRING, allowNull: true },
  Color_Third: { type: Sequelize.STRING, allowNull: true }
});

// *************************************************
// Euro Model
// *************************************************
const iTeams = eurodb.define("team", {
  Name: { type: Sequelize.STRING, allowNull: true },
  GP: { type: Sequelize.STRING, allowNull: true },
  FG: { type: Sequelize.STRING, allowNull: true },
  FGA: { type: Sequelize.STRING, allowNull: true },
  FG_PCT: { type: Sequelize.STRING, allowNull: true },
  Three_Pointers: { type: Sequelize.STRING, allowNull: true },
  Three_Pointers_Att: { type: Sequelize.STRING, allowNull: true },
  Three_Pointers_Pct: { type: Sequelize.STRING, allowNull: true },
  Two_Pointers: { type: Sequelize.STRING, allowNull: true },
  Two_Pointers_Att: { type: Sequelize.STRING, allowNull: true },
  Two_Pointers_Pct: { type: Sequelize.STRING, allowNull: true },
  FTM: { type: Sequelize.STRING, allowNull: true },
  FTA: { type: Sequelize.STRING, allowNull: true },
  FT_PCT: { type: Sequelize.STRING, allowNull: true },
  ORB: { type: Sequelize.STRING, allowNull: true },
  DRB: { type: Sequelize.STRING, allowNull: true },
  TRB: { type: Sequelize.STRING, allowNull: true },
  AST: { type: Sequelize.STRING, allowNull: true },
  STL: { type: Sequelize.STRING, allowNull: true },
  BLK: { type: Sequelize.STRING, allowNull: true },
  TOV: { type: Sequelize.STRING, allowNull: true },
  PF: { type: Sequelize.STRING, allowNull: true },
  PTS: { type: Sequelize.STRING, allowNull: true },
  W: { type: Sequelize.STRING, allowNull: true },
  L: { type: Sequelize.STRING, allowNull: true },
  PW: { type: Sequelize.STRING, allowNull: true },
  PL: { type: Sequelize.STRING, allowNull: true },
  MOV: { type: Sequelize.STRING, allowNull: true },
  SOS: { type: Sequelize.STRING, allowNull: true },
  SRS: { type: Sequelize.STRING, allowNull: true },
  ORtg: { type: Sequelize.STRING, allowNull: true },
  DRtg: { type: Sequelize.STRING, allowNull: true },
  PACE: { type: Sequelize.STRING, allowNull: true },
  FTr: { type: Sequelize.STRING, allowNull: true },
  Three_PAr: { type: Sequelize.STRING, allowNull: true },
  OFF_eFG_PCT: { type: Sequelize.STRING, allowNull: true },
  OFF_TOV_PCT: { type: Sequelize.STRING, allowNull: true },
  ORB_PCT: { type: Sequelize.STRING, allowNull: true },
  OFF_FT_FGA: { type: Sequelize.STRING, allowNull: true },
  DEF_eFG_PCT: { type: Sequelize.STRING, allowNull: true },
  DEF_TOV_PCT: { type: Sequelize.STRING, allowNull: true },
  DRB_PCT: { type: Sequelize.STRING, allowNull: true },
  DEF_FT_FGA: { type: Sequelize.STRING, allowNull: true },
  oFG: { type: Sequelize.STRING, allowNull: true },
  oFGA: { type: Sequelize.STRING, allowNull: true },
  oFGPCT: { type: Sequelize.STRING, allowNull: true },
  o3P: { type: Sequelize.STRING, allowNull: true },
  o3PA: { type: Sequelize.STRING, allowNull: true },
  o3PCT: { type: Sequelize.STRING, allowNull: true },
  o2P: { type: Sequelize.STRING, allowNull: true },
  o2PA: { type: Sequelize.STRING, allowNull: true },
  o2PCT: { type: Sequelize.STRING, allowNull: true },
  oFTM: { type: Sequelize.STRING, allowNull: true },
  oFTA: { type: Sequelize.STRING, allowNull: true },
  oFTPCT: { type: Sequelize.STRING, allowNull: true },
  oORB: { type: Sequelize.STRING, allowNull: true },
  oDRB: { type: Sequelize.STRING, allowNull: true },
  oTRB: { type: Sequelize.STRING, allowNull: true },
  oAST: { type: Sequelize.STRING, allowNull: true },
  oSTL: { type: Sequelize.STRING, allowNull: true },
  oBLK: { type: Sequelize.STRING, allowNull: true },
  oTOV: { type: Sequelize.STRING, allowNull: true },
  oPF: { type: Sequelize.STRING, allowNull: true },
  oPTS: { type: Sequelize.STRING, allowNull: true },
  Logo: { type: Sequelize.STRING, allowNull: true },
  Color_Main: { type: Sequelize.STRING, allowNull: true },
  Color_Sec: { type: Sequelize.STRING, allowNull: true },
  Color_Third: { type: Sequelize.STRING, allowNull: true }
});

// *************************************************
// Liga ACB MODEL
// *************************************************
const ligaacbPlayers = ligaacbdb.define("player", {
  name: { type: Sequelize.STRING, allowNull: false },
  position: { type: Sequelize.STRING, allowNull: false },
  team: { type: Sequelize.STRING, allowNull: true },
  mpg: { type: Sequelize.FLOAT, allowNull: true },
  gamesPlayed: { type: Sequelize.INTEGER, allowNull: true },
  twoPtPct: { type: Sequelize.FLOAT, allowNull: true },
  threePtPct: { type: Sequelize.FLOAT, allowNull: true },
  fgPct: { type: Sequelize.FLOAT, allowNull: true },
  freeThrowPct: { type: Sequelize.FLOAT, allowNull: true },
  trb: { type: Sequelize.FLOAT, allowNull: true },
  ast: { type: Sequelize.FLOAT, allowNull: true },
  pts: { type: Sequelize.FLOAT, allowNull: true },
  tov: { type: Sequelize.FLOAT, allowNull: true },
  stl: { type: Sequelize.FLOAT, allowNull: true },
  blk: { type: Sequelize.FLOAT, allowNull: true },
  plusMinus: { type: Sequelize.FLOAT, allowNull: true },
  draft: { type: Sequelize.STRING, allowNull: true },
  experience: { type: Sequelize.STRING, allowNull: true },
  height: { type: Sequelize.STRING, allowNull: true },
  weight: { type: Sequelize.STRING, allowNull: true },
  age: { type: Sequelize.STRING, allowNull: true },
  college: { type: Sequelize.STRING, allowNull: true },
  picture: { type: Sequelize.STRING, allowNull: true },
  fgm: { type: Sequelize.STRING, allowNull: true },
  fga: { type: Sequelize.STRING, allowNull: true },
  orbPct: { type: Sequelize.STRING, allowNull: true },
  astPct: { type: Sequelize.STRING, allowNull: true },
  tovPct: { type: Sequelize.STRING, allowNull: true },
  dws: { type: Sequelize.STRING, allowNull: true },
  obpm: { type: Sequelize.STRING, allowNull: true },
  vorp: { type: Sequelize.STRING, allowNull: true },
  injury: { type: Sequelize.STRING, allowNull: true },
  threePt: { type: Sequelize.STRING, allowNull: true },
  threePtAtt: { type: Sequelize.STRING, allowNull: true },
  twoPt: { type: Sequelize.STRING, allowNull: true },
  twoPtAtt: { type: Sequelize.STRING, allowNull: true },
  efgPct: { type: Sequelize.STRING, allowNull: true },
  ft: { type: Sequelize.STRING, allowNull: true },
  fta: { type: Sequelize.STRING, allowNull: true },
  drbPct: { type: Sequelize.STRING, allowNull: true },
  stlPct: { type: Sequelize.STRING, allowNull: true },
  usgPct: { type: Sequelize.STRING, allowNull: true },
  ws: { type: Sequelize.STRING, allowNull: true },
  dbpm: { type: Sequelize.STRING, allowNull: true },
  avgDistShot: { type: Sequelize.STRING, allowNull: true },
  number: { type: Sequelize.STRING, allowNull: true },
  orb: { type: Sequelize.STRING, allowNull: true },
  drb: { type: Sequelize.STRING, allowNull: true },
  pf: { type: Sequelize.STRING, allowNull: true },
  per: { type: Sequelize.STRING, allowNull: true },
  tsPct: { type: Sequelize.STRING, allowNull: true },
  threePAr: { type: Sequelize.STRING, allowNull: true },
  ftr: { type: Sequelize.STRING, allowNull: true },
  trbPct: { type: Sequelize.STRING, allowNull: true },
  blkPct: { type: Sequelize.STRING, allowNull: true },
  ows: { type: Sequelize.STRING, allowNull: true },
  wsFourtyEight: { type: Sequelize.STRING, allowNull: true },
  bpm: { type: Sequelize.STRING, allowNull: true },
  salary: { type: Sequelize.STRING, allowNull: true }
});

const ligaacbTeams = ligaacbdb.define("team", {
  Name: { type: Sequelize.STRING, allowNull: true },
  GP: { type: Sequelize.STRING, allowNull: true },
  FG: { type: Sequelize.STRING, allowNull: true },
  FGA: { type: Sequelize.STRING, allowNull: true },
  FG_PCT: { type: Sequelize.STRING, allowNull: true },
  Three_Pointers: { type: Sequelize.STRING, allowNull: true },
  Three_Pointers_Att: { type: Sequelize.STRING, allowNull: true },
  Three_Pointers_Pct: { type: Sequelize.STRING, allowNull: true },
  Two_Pointers: { type: Sequelize.STRING, allowNull: true },
  Two_Pointers_Att: { type: Sequelize.STRING, allowNull: true },
  Two_Pointers_Pct: { type: Sequelize.STRING, allowNull: true },
  FTM: { type: Sequelize.STRING, allowNull: true },
  FTA: { type: Sequelize.STRING, allowNull: true },
  FT_PCT: { type: Sequelize.STRING, allowNull: true },
  ORB: { type: Sequelize.STRING, allowNull: true },
  DRB: { type: Sequelize.STRING, allowNull: true },
  TRB: { type: Sequelize.STRING, allowNull: true },
  AST: { type: Sequelize.STRING, allowNull: true },
  STL: { type: Sequelize.STRING, allowNull: true },
  BLK: { type: Sequelize.STRING, allowNull: true },
  TOV: { type: Sequelize.STRING, allowNull: true },
  PF: { type: Sequelize.STRING, allowNull: true },
  PTS: { type: Sequelize.STRING, allowNull: true },
  W: { type: Sequelize.STRING, allowNull: true },
  L: { type: Sequelize.STRING, allowNull: true },
  PW: { type: Sequelize.STRING, allowNull: true },
  PL: { type: Sequelize.STRING, allowNull: true },
  MOV: { type: Sequelize.STRING, allowNull: true },
  SOS: { type: Sequelize.STRING, allowNull: true },
  SRS: { type: Sequelize.STRING, allowNull: true },
  ORtg: { type: Sequelize.STRING, allowNull: true },
  DRtg: { type: Sequelize.STRING, allowNull: true },
  PACE: { type: Sequelize.STRING, allowNull: true },
  FTr: { type: Sequelize.STRING, allowNull: true },
  Three_PAr: { type: Sequelize.STRING, allowNull: true },
  OFF_eFG_PCT: { type: Sequelize.STRING, allowNull: true },
  OFF_TOV_PCT: { type: Sequelize.STRING, allowNull: true },
  ORB_PCT: { type: Sequelize.STRING, allowNull: true },
  OFF_FT_FGA: { type: Sequelize.STRING, allowNull: true },
  DEF_eFG_PCT: { type: Sequelize.STRING, allowNull: true },
  DEF_TOV_PCT: { type: Sequelize.STRING, allowNull: true },
  DRB_PCT: { type: Sequelize.STRING, allowNull: true },
  DEF_FT_FGA: { type: Sequelize.STRING, allowNull: true },
  oFG: { type: Sequelize.STRING, allowNull: true },
  oFGA: { type: Sequelize.STRING, allowNull: true },
  oFGPCT: { type: Sequelize.STRING, allowNull: true },
  o3P: { type: Sequelize.STRING, allowNull: true },
  o3PA: { type: Sequelize.STRING, allowNull: true },
  o3PCT: { type: Sequelize.STRING, allowNull: true },
  o2P: { type: Sequelize.STRING, allowNull: true },
  o2PA: { type: Sequelize.STRING, allowNull: true },
  o2PCT: { type: Sequelize.STRING, allowNull: true },
  oFTM: { type: Sequelize.STRING, allowNull: true },
  oFTA: { type: Sequelize.STRING, allowNull: true },
  oFTPCT: { type: Sequelize.STRING, allowNull: true },
  oORB: { type: Sequelize.STRING, allowNull: true },
  oDRB: { type: Sequelize.STRING, allowNull: true },
  oTRB: { type: Sequelize.STRING, allowNull: true },
  oAST: { type: Sequelize.STRING, allowNull: true },
  oSTL: { type: Sequelize.STRING, allowNull: true },
  oBLK: { type: Sequelize.STRING, allowNull: true },
  oTOV: { type: Sequelize.STRING, allowNull: true },
  oPF: { type: Sequelize.STRING, allowNull: true },
  oPTS: { type: Sequelize.STRING, allowNull: true },
  Logo: { type: Sequelize.STRING, allowNull: true },
  Color_Main: { type: Sequelize.STRING, allowNull: true },
  Color_Sec: { type: Sequelize.STRING, allowNull: true },
  Color_Third: { type: Sequelize.STRING, allowNull: true }
});

// Players.sync({ force: true }).then(() => {
//   return Players.bulkCreate([{ name: "Michael Griffin", position: "PG" }]);
// });
Players.sync();
Teams.sync();
// Teams.sync({ force: true }).then(() => {
//   return Teams.bulkCreate([{ Name: "Los Angeles Griffins" }]);
// });
// cPlayers.sync({ force: true }).then(() => {
//   return cPlayers.bulkCreate([{ name: "Michael Griffin", position: "PG" }]);
// });
cPlayers.sync();
cTeams.sync();
// cTeams.sync({ force: true }).then(() => {
//   return cTeams.bulkCreate([{ Name: "Los Angeles Griffins" }]);
// });
ligaacbPlayers.sync();
ligaacbTeams.sync();

iTeams.sync();
// iTeams.sync({ force: true }).then(() => {
//   return iTeams.bulkCreate([{ Name: "Euro Griffins" }]);
// });

PostUp.sync();
// PostUp.sync({ force: true }).then(() => {
//   return PostUp.bulkCreate([{ name: "Michael Griffin" }]);
// });

CatchShoot.sync();
// CatchShoot.sync({ force: true }).then(() => {
//   return CatchShoot.bulkCreate([{ name: "Michael Griffin" }]);
// });

SpeedDistance.sync();
// SpeedDistance.sync({ force: true }).then(() => {
//   return SpeedDistance.bulkCreate([{ name: "Michael Griffin" }]);
// });

PRBallHandler.sync();
// PRBallHandler.sync({ force: true }).then(() => {
//   return PRBallHandler.bulkCreate([{ name: "Michael Griffin" }]);
// });

PRRollMan.sync();
// PRRollMan.sync({ force: true }).then(() => {
//   return PRRollMan.bulkCreate([{ name: "Michael Griffin" }]);
// });

Isolation.sync();
// Isolation.sync({ force: true }).then(() => {
//   return Isolation.bulkCreate([{ name: "Michael Griffin" }]);
// });

Transition.sync();
// Transition.sync({ force: true }).then(() => {
//   return Transition.bulkCreate([{ name: "Michael Griffin" }]);
// });

Hustle.sync();
// Hustle.sync({ force: true }).then(() => {
//   return Hustle.bulkCreate([{ name: "Michael Griffin" }]);
// });

Shooting.sync();
// Shooting.sync({ force: true }).then(() => {
//   return Shooting.bulkCreate([{ name: "Michael Griffin" }]);
// });

gTeams.sync();
// gTeams.sync({ force: true }).then(() => {
//   return gTeams.bulkCreate([{ Name: "Michael Griffin" }]);
// });

gPlayers.sync();
// gPlayers.sync({ force: true }).then(() => {
//   return gPlayers.bulkCreate([{ name: "Michael Griffin" }]);
// });

Salaries.sync();
// Salaries.sync({ force: true }).then(() => {
//   return Salaries.bulkCreate([{ name: "Michael Griffin" }]);
// });

module.exports = {
  Players,
  Teams,
  cPlayers,
  cTeams,
  ligaacbPlayers,
  ligaacbTeams,
  PostUp,
  CatchShoot,
  SpeedDistance,
  PRBallHandler,
  PRRollMan,
  Isolation,
  Transition,
  Hustle,
  Shooting,
  iTeams,
  gTeams,
  gPlayers,
  Salaries,
  PlayersSixteen,
  PlayersSeventeen,
  PlayersFifteen,
  CollegeTeams,
  PlayersHistory,
  PlayersNineteen
};
