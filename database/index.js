const { Database, aql } = require('arangojs');

const db = new Database({
  url: 'http://localhost:8529',
});
// db.useDatabase("testing");
db.useBasicAuth('root', 'student');

const getAll = async function () {
  try {
    const cursor = await db.query(aql`
      FOR c in testing
        RETURN {"_key":c._key,"english":c.english,"factor":c.factor,"repeat":c.repeat,"schedule":c.schedule,"spanish":c.spanish}
    `);

    const result = await cursor.all();
    return result;
  } catch (err) {
    console.log(err);
  }
};

module.exports.getAll = getAll;
