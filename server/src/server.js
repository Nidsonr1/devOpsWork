const express = require('express');
const app = express();
const routes = require('./routes');
const port = process.env.PORT || 3333;
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port, () => { console.log(`Server is run in http://54.94.184.84:3333:${port}`) });
