// Input containers
var dateInput = document.getElementById("date-input");
var cityInput = document.getElementById("city-input");
var flightList = document.getElementById("list-flights");
// Buttons

// Event handlers

var date = dateInput.value; // Need to assign to calender input

// Covid section

var searchButton = document.getElementById("search-button");
var countryInput = document.getElementById("country-input");

searchButton.addEventListener("click", () => {
  var countryName = countryInput.value;

  var requestUrl =
    "https://disease.sh/v3/covid-19/countries/" + countryName + "?strict=true";

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
    var cityCode = `City code: ` + data[0].codeIataCity;
    console.log(cityCode);
    var nameCity = `City name: ` + data[0].timezone;
    console.log(nameCity);
    var country = `Country:  ` + data[0].nameCountry;
    console.log(country);

    var cityCode = data[0].codeIataCity;
  });

var date = "2023-09-05";

var flightInfo = `https://aviation-edge.com/v2/public/flightsFuture?key=${flightAPI}&type=departure&iataCode=${city}&date=${date}`;

fetch(flightInfo)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    for (i = 0; i < 1; i++) {
      var flightNumber = `Flight number: ` + data[i].flight.iataNumber;
      var departureTime = `Departure time: ` + data[i].departure.scheduledTime;
      var gateTerminal =
        `Leaving from gate: ` +
        data[i].departure.gate +
        "  " +
        `Terminal: ` +
        data[i].departure.terminal;
      var arrival = "Travelling to: " + data[i].arrival.iataCode;

      var listOfFlights = document.createElement("li");
      listOfFlights.textContent =
        flightNumber +
        "\n" +
        departureTime +
        "\n" +
        gateTerminal +
        "\n" +
        arrival;

      flightList.appendChild(listOfFlights);

      var arrivalCode = data[i].arrival.iataCode;
      var arrivalInfo = `https://aviation-edge.com/v2/public/airportDatabase?key=${flightAPI}&codeIataAirport=${arrivalCode}`;

      fetch(arrivalInfo)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          var arrivalCodeCity = `Arrival City code: ` + data[0].codeIataCity;
          var arrivalNameCity = `Arrival City name: ` + data[0].timezone;
          var arrivalCountry = `Country:  ` + data[0].nameCountry;
          console.log(
            arrivalCodeCity + "\n" + arrivalNameCity + "\n" + arrivalCountry
          );
        });
    }
  });
