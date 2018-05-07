require('dotenv').config();

const { DefinePlugin } = require('webpack');

const isProduction = process.env.NODE_ENV === 'production';
const API_URL_DEV = process.env.API_URL_DEV;
const API_URL_PROD = process.env.API_URL_PROD;
const TRACKING_ID = process.env.TRACKING_ID;

const API_URL = isProduction ? API_URL_PROD : API_URL_DEV;

module.exports = {
  webpack: config => {
    config.plugins.push(
      new DefinePlugin({
        API_URL: JSON.stringify(API_URL),
        TRACKING_ID: JSON.stringify(TRACKING_ID)
      })
    );

    return config;
  }
};
