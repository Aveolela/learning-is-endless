const express = require('./express.js');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.end('hello express');
})

app.listen(port, () => { console.log('listening on port: ' + port); });