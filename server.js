// server.js
const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache');
const config = require('./config/config');

const app = express();
const cache = new NodeCache({ stdTTL: config.cacheTTL });

app.use(express.json());

app.get('/holidays', async (req, res) => {
    const { country, year } = req.query;

    if (!country || !year) {
        return res.status(400).json({ error: 'Country and year parameters are required' });
    }

    const cacheKey = `${country}_${year}`;
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
        console.log('Returning cached data');
        return res.json(cachedData);
    }

    try {
        console.log(`Fetching holidays for country: ${country}, year: ${year}`);
        const response = await axios.get(`${config.calendarificApiUrl}/holidays`, {
            params: {
                api_key: config.calendarificApiKey,
                country: country,
                year: year,
            },
        });

        if (response.data && response.data.response && response.data.response.holidays) {
            const holidays = response.data.response.holidays;

            if (holidays.length > 0) {
                cache.set(cacheKey, holidays);
                console.log('Fetched data from Calendarific API');
                return res.json(holidays);
            } else {
                console.error('No holidays found for the specified country and year:', response.data);
                return res.status(404).json({ error: 'No holidays found for the specified country and year' });
            }
        } else {
            console.error('Unexpected response format from Calendarific API:', response.data);
            return res.status(500).json({ error: 'Unexpected response format from Calendarific API' });
        }
    } catch (error) {
        console.error('Error fetching data from Calendarific API:', error.message);
        console.error('Error details:', error.response ? error.response.data : 'No response data');
        return res.status(500).json({ error: 'Error fetching data from Calendarific API' });
    }
});

app.get('/countries', async (req, res) => {
    const cacheKey = 'countries';
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
        console.log('Returning cached data');
        return res.json(cachedData);
    }

    try {
        console.log('Fetching supported countries');
        const response = await axios.get(`${config.calendarificApiUrl}/countries`, {
            params: {
                api_key: config.calendarificApiKey,
            },
        });

        console.log('Response from Calendarific API:', response.data);

        if (response.data && response.data.response) {
            const countries = response.data.response.countries || [];
            cache.set(cacheKey, countries);
            console.log('Fetched data from Calendarific API');
            return res.json(countries);
        } else {
            console.error('Unexpected response format from Calendarific API:', response.data);
            return res.status(500).json({ error: 'Unexpected response format from Calendarific API' });
        }
    } catch (error) {
        console.error('Error fetching data from Calendarific API:', error.message);
        console.error('Error details:', error.response ? error.response.data : 'No response data');
        return res.status(500).json({ error: 'Error fetching data from Calendarific API' });
    }
});

// Export app for testing
module.exports = app;

if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
