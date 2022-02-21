const express = require('express');
const app = express();
const port = 3000;

// HTTP动词抽象至app实例上的方法，如：app.get(),app.post()等
app.get('/', (req, res) => {
  res.send('hello express');
})

app.listen(port, () => console.log('listening on port ' + port));