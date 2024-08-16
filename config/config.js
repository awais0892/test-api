// config/config.js
require('dotenv').config();

const config = {
  calendarificApiKey: process.env.CALENDARIFIC_API_KEY,
  calendarificApiUrl: process.env.CALENDARIFIC_API_URL,
  cacheTTL: parseInt(process.env.CACHE_TTL, 10) || 600 // Default 10 minutes
};

module.exports = config;
