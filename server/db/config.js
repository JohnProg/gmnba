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
console.log("connected to remote db - Liga-ACB");

module.exports = { db, cdb, ligaacbdb };
