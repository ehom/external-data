const finnhub = require('finnhub');
const fs = require('fs');

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
// TODO: error handling
const [secret] = process.argv.slice(2);
api_key.apiKey = secret;

console.log(secret);

console.debug("env:", process.env);

const finnhubClient = new finnhub.DefaultApi()

// Forex rates
finnhubClient.forexRates({"base": "USD"}, (error, data, response) => {
    console.debug(data);
    data["timeStamp"] = new Date(Date.now()); // ISO
    console.debug(data);
    saveJsonTo('usd.json', data);
});

const saveJsonTo = (filename, data) => {
  const text = JSON.stringify(data, null, 2);
  fs.writeFileSync(filename, text);
};
