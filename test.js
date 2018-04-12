const axios = require('axios');
const querystring = require('querystring');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: '.env' });
}

const clientId = process.env.OKTA_CLIENT_ID;
const clientSecret = process.env.OKTA_CLIENT_SECRET;

const username = process.env.OKTA_TEST_USER_USERNAME;
const password = process.env.OKTA_TEST_USER_PASSWORD;

const instance = axios.create({
  baseURL: process.env.OKTA_BASE_URL,
  headers: {
    accept: 'application/json',
    'content-type': 'application/x-www-form-urlencoded',
    'content-length': '0',
    authorization:
      'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
  }
});

(async () => {
  try {
    let response = await instance.post(
      '/oauth2/default/v1/token?' +
        querystring.stringify({
          grant_type: 'password',
          username: username,
          password: password,
          scope: 'openid groups'
        })
    );

    // console.log(response.data);

    let id_token = jwt.decode(response.data.id_token);

    console.log(id_token);

    let access_token = jwt.decode(response.data.access_token);

    // console.log(access_token);
  } catch (e) {
    console.log(e.response.data);
  }
})();
