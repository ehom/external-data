#!/usr/bin/env node

const fetch = require('node-fetch');
const fs = require('fs');

const target = "https://raw.githubusercontent.com/nytimes/covid-19-data/master/live/us-states.csv";

fetch(target)
  .then((response) => response.text())
  .then((data) => main(data));

function main(data) {
  fs.writeFile("./us-states.csv", data, 'utf-8', (error) => {
    if (error) {
      return console.log(error);
    }
    console.log("The csv file was saved!");
  });

  const text = JSON.stringify(csv2json(data), null, 4);

  fs.writeFile("./us-states.json", text, 'utf-8', (error) => {
    if (error) {
      return console.log(error);
    }
    console.log("The json file was saved!");
  });
}

const csv2json = (data) => {
  const lines = data.split('\n');  
  const json = lines.map(line => {
    const [
      date,
      state,
      fips,
      cases,
      deaths,
      confirmed_cases,
      confirmed_deaths,
      probable_cases,
      probable_deaths
    ] = line.split(",");

    return {
      date: date,
      state: state,
      fips: fips,
      cases: isNaN(cases) ? cases : parseInt(cases),
      deaths: isNaN(deaths) ? deaths : parseInt(deaths),
      confirmed_cases: isNaN(confirmed_cases) ? confirmed_cases : parseInt(confirmed_cases),
      confirmed_deaths: isNaN(confirmed_deaths) ? confirmed_deaths : parseInt(confirmed_deaths),
      probable_cases: isNaN(probable_cases) ? probable_cases : parseInt(probable_cases),
      probable_deaths: isNaN(probable_deaths) ? probable_deaths : parseInt(probable_deaths)
    };
  });

  return json;
};
