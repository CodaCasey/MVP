const { getAll } = require('../database/index.js');

module.exports.getAllDocuments = async (req, res, cb) => {
  getAll()
    .then((data) => {
      res.status(200);
      res.send(data);
      cb(null, data);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(404);
      cb(error);
    });
};
