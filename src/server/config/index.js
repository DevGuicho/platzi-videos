require('dotenv').config();

const config = {
  apiUrl: process.env.API_URL,
  apiKeyToken: process.env.API_KEY_TOKEN,
};
module.exports = { config };
