const express = require('express');
const path = require('path');

const app = express();

app.get('/tickets', function (req, res) {
  return res.sendFile(path.join(__dirname, 'tickets.json'));
});

app.listen(8001);