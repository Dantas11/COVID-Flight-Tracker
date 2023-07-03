// Input containers
var dateInput = document.getElementById("date-input");
var cityInput = document.getElementById("city-input");
// Buttons

// Event handlers

var date = dateInput.value; // Need to assign to calender input

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
const flightAPI = "59de1f-88c9f9";
var city = "syd";
var cities = `https://aviation-edge.com/v2/public/airportDatabase?key=${flightAPI}&codeIataAirport=${city}`;
fetch(cities)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    var cityCode = `City code: ` + data[0].codeIataCity;
    console.log(cityCode);
    var nameCity = `City name: ` + data[0].timezone;
    console.log(nameCity);
    var country = `Country:  ` + data[0].nameCountry;
    console.log(country);

    var cityCode = data[0].codeIataCity;

    getFlightInfo(cityCode);
  });

function getFlightInfo(cityCode) {
  var date = "2023-09-05";

  var flightInfo = `https://aviation-edge.com/v2/public/flightsFuture?key=${flightAPI}&type=departure&iataCode=${city}&date=${date}`;
  fetch(flightInfo)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var airlineName = `Airline company: ` + data[0].codeshared.airline.name;
      console.log(airlineName);
      var flightNumber = `Flight number: ` + data[0].flight.iataNumber;
      console.log(flightNumber);
      var departureTime = `Departure time: ` + data[0].departure.scheduledTime;
      console.log(departureTime);
      var gateTerminal =
        `Leaving from gate: ` +
        data[0].departure.gate +
        "  " +
        `Terminal: ` +
        data[0].departure.terminal;
      console.log(gateTerminal);
      var arrival = "Travelling to: " + data[0].arrival.iataCode;
      console.log(arrival);
      var arrivalCode = data[0].arrival.iataCode;
      var arrivalInfo = `https://aviation-edge.com/v2/public/airportDatabase?key=${flightAPI}&codeIataAirport=${arrivalCode}`;
      fetch(arrivalInfo)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          var arrivalCodeCity = `Arrival City code: ` + data[0].codeIataCity;
          console.log(arrivalCodeCity);
          var arrivalNameCity = `Arrival City name: ` + data[0].timezone;
          console.log(arrivalNameCity);
          var arrivalCountry = `Country:  ` + data[0].nameCountry;
          console.log(arrivalCountry);
        });
    });
}
