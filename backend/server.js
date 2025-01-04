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

app.post('/getOutfit', async (req, res) => {
    const location  = req.body.location;

    try {
        const locationResponse = await axios.get(
            `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=${1}&appid=${OPENWEATHER_API_KEY}`
        );

        const lat = locationResponse.data[0].lat;
        const lon = locationResponse.data[0].lon;

        // Fetch weather data
        const weatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
        );
        const weatherData = weatherResponse.data;
        
        // Extract relevant data
        const temperature = weatherData.main.temp;
        const temperature_min = weatherData.main.temp_min;
        const temperature_max = weatherData.main.temp_max;
        const humidity = weatherData.main.humidity;
        const wind_speed = weatherData.wind.speed;
        const clouds = weatherData.clouds.all;
        const condition = weatherData.weather[0].description.toLowerCase();
    
        // Map to suggested outfit
        //   const outfit = outfitMapping[condition] || "Default Outfit";
    
        res.json({
            temperature: `${temperature}°C`,
            temperature_min: `${temperature_min}°C`,
            temperature_max: `${temperature_max}°C`,
            humidity: `${humidity}%`,
            wind_speed: `${wind_speed}m/s`,
            clouds: `${clouds}%`,
            condition,
            // condition,
            // outfit,
        });
        } catch (error) {
        console.error("Error fetching weather data:", error);
        res.status(500).json({ error: "Unable to fetch weather data" });
        }
    });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

