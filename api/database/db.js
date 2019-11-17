//jshint esversion: 8, node: true

const lowdb = require('lowdb');
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("./db.json");
const db = lowdb(adapter);

db.defaults({ judges: [], classes: [], horses: [] })
  .value();

module.exports = db;

module.exports.horseId = () => {
  return db.get("horses").last().value().id + 1;
};

module.exports.classId = () => {
  return db.get("classes").last().value().id + 1;
};

module.exports.judgeId = () => {
  return db.get("judges").last().value().id + 1;
};