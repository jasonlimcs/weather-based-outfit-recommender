const axios = require("axios");
const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const PORT = 8080;
const VIEWS_FOLDER = path.join(__dirname, "views/");

// app.use(bodyParser.json());
app.use(require('cors')());
app.use(express.urlencoded({extended: true}));

require('dotenv').config();

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

console.log('Your API Key:', OPENWEATHER_API_KEY);


app.get('/', (req, res) => {
    res.sendFile(VIEWS_FOLDER + 'index.html');
});



  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

