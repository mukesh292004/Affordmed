const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 4000;
const connection = require('./connection');
const Authrouter = require('./route/AuthRouter');


app.use('/Auth',Authrouter)


app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});