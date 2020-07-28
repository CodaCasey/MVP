const { Database, aql } = require("arangojs");
const db = new Database({
  url:"http://localhost:8529"

});
//db.useDatabase("");
db.useBasicAuth("root", "student");
const reviews = db.collection("MVP");