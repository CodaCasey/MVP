const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routehandlers.js');

const app = express();
const port = 3000;

app.use('/', express.static(path.join(__dirname, '..', 'client', 'public')));
app.use(bodyParser.json());

app.get('/getWords', routes.getAllDocuments);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
