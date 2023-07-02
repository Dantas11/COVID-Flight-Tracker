// Input containers

// Buttons

// Event handlers

// Location
var airportLocation = "syd"; // Need to assign to an input

// Airlabs API Key
var airLabsAPIKey = `a0820d14-87e3-4ba3-b66d-96618ceefedb`;

// Airlabs location URL
var airportsURL = `https://airlabs.co/api/v9/airports?iata_code=${airportLocation}&api_key=${airLabsAPIKey}`;

// Airport location API
fetch(airportsURL)
  .then((response) => response.json())
  .then((data) => {
    // Country data
    var country = `Departing Country: ` + data.response[0].country_code;

    // Airport Name
    var airportName = `Departing Airport: ` + data.response[0].name;
    console.log(country);
    console.log(airportName);

    var iataCode = data.response[0].iata_code;
    console.log(iataCode);
    var date = "2023-07-01"; // Need to assign to calender input

    // Flight info URL
    var flightStatsURL = `https://airlabs.co/api/v9/routes?dep_iata=${iataCode}&date=${date}&api_key=${airLabsAPIKey}`;

    // Flight info API
    fetch(flightStatsURL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        var arrivalIATA = data.response[0].arr_iata;

        // Airport location URL but with arrival queries from flight info
        var arrivalAirportURL = `https://airlabs.co/api/v9/airports?iata_code=${arrivalIATA}&api_key=${airLabsAPIKey}`;

        // Airport location API again but with the ARRIVAL info from the flight info api.
        fetch(arrivalAirportURL)
          .then((response) => response.json())
          .then((data) => {
            var arrivalCountry =
              "Arrival Country: " + data.response[0].country_code;
            var arrivalAirport = "Arrival Airport: " + data.response[0].name;

            console.log(arrivalCountry);
            console.log(arrivalAirport);
          });
      });
  })
  .catch((error) => {
    console.error(error);
  });

// Covid section

var searchButton = document.getElementById("search-button");
var countryInput = document.getElementById("country-input");

searchButton.addEventListener("click", () => {
  var countryName = countryInput.value;

  var requestUrl =
    "https://restcountries.com/v3.1/name/" + countryName + "?fullText=true";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
});
