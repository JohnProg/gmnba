const Sequelize = require("sequelize");

const db = new Sequelize(
  "postgres://cbncypxc:GWEic6mmnNU5q46ZOO2z1djA4RGwz4aN@baasu.db.elephantsql.com:5432/cbncypxc",
  {
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      idle: 20000,
      acquire: 20000,
      evict: 20000
    }
  }
);

const cdb = new Sequelize(
  "postgres://mmtnbyyu:8th65F6EICt46OY-pbY6thbqhB6-rSKv@baasu.db.elephantsql.com:5432/mmtnbyyu",
  {
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      idle: 20000,
      acquire: 20000,
      evict: 20000
    }
  }
);

const tracking1db = new Sequelize(
  "postgres://rgbbkvhn:RoFTSWi2ndWF1L7-4-tZ2fSXZ8URIMAI@baasu.db.elephantsql.com:5432/rgbbkvhn",
  {
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      idle: 20000,
      acquire: 20000,
      evict: 20000
    }
  }
);

const tracking2db = new Sequelize(
  "postgres://egqmdmfe:Eu1ZB7Gu8rYvUHaDq7cIy9rRukJF_d1j@baasu.db.elephantsql.com:5432/egqmdmfe",
  {
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      idle: 20000,
      acquire: 20000,
      evict: 20000
    }
  }
);

const tracking3db = new Sequelize(
  "postgres://wzcmoelm:3CtorJfN43mhXCmInSymZUclqOOgDp3I@baasu.db.elephantsql.com:5432/wzcmoelm",
  {
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      idle: 20000,
      acquire: 20000,
      evict: 20000
    }
  }
);

const ligaacbdb = new Sequelize(
  "postgres://duxdpgwx:fsdbfMAx6UIMhQJhlMHs-mqql6WCrX2o@baasu.db.elephantsql.com:5432/duxdpgwx",
  {
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      idle: 20000,
      acquire: 20000,
      evict: 20000
    }
  }
);

console.log("connected to remote db - NBA");
console.log("connected to remote db - College");
console.log("connected to remote db - Tracking");
console.log("connected to remote db - Liga-ACB");

module.exports = { db, cdb, ligaacbdb, tracking1db, tracking2db, tracking3db };
