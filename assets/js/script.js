// Input containers

// Buttons

// Event handlers

// Airport location API

// Location
var airportLocation = ""; // Need to assign to an input
var airportsAPIKey = `a0820d14-87e3-4ba3-b66d-96618ceefedb`;
var airportsURL = `https://airlabs.co/api/v9/airports?iata_code=${airportLocation}&api_key=${airportsAPIKey}`;

fetch(airports)
  .then((response) => response.json())
  .then((data) => {
    // Country data
    var country = `Country: ` + data.response[0].country_code;

    // Airport Name
    var airportName = `Airport: ` + data.response[0].name;
    console.log(country);
    console.log(airportName);
  });
// IATA code data FROM airport location API
var iataCode = data.response[0].iata_code;
var flightStatsAPIKey = "0ae7bd57d8e9678e19a06cc4d91ce269";
var flightStatsAppID = `e1beaacb`;
var flightStatsURL = `https://api.flightstats.com/flex/schedules/rest/v1/json/from/ABQ/departing/2023/07/05/12?appId=${flightStatsAppID}&appKey=${flightStatsAPIKey}&codeType=${iataCode}`;

fetch(flightStatsURL)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })

  .catch((error) => {
    console.error(error);
  });
