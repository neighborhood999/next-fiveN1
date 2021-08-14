const API_URL = process.env.API_URL || 'http://localhost:8000';
const TRACKING_ID = process.env.TRACKING_ID || 'development';

module.exports = {
  env: {
    API_URL,
    TRACKING_ID,
  },
};
