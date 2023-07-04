// Input containers
var dateInput = document.getElementById("date-input");
var cityInput = document.querySelector("#city-input");
var flightList = document.getElementById("list-flights");
// Buttons
var flightSearchButton = document.getElementById("flight-search-button");
var searchButton = document.getElementById("covid-search-button");
// Event handlers

// Covid section

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
      var countryName = `Country: ` + data.country;
      console.log(countryName);
      var countryContinent = `Continent: ` + data.continent;
      console.log(countryContinent);
      var countryPopulation = `Population: ` + data.population;
      console.log(countryPopulation);
      var countryCovidCases = `Cases: ` + data.cases;
      console.log(countryCovidCases);
      var countryCovidActiveCases = `Active:` + data.active;
      console.log(countryCovidActiveCases);
    });
});
function searchFlights() {
  const flightAPI = "59de1f-88c9f9";
  var city = cityInput.value;
  console.log(city);
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

  var date = dateInput.date.Date.toISOString().split("T")[0];
  console.log(date); // Need to assign to calender input
  var flightInfo = `https://aviation-edge.com/v2/public/flightsFuture?key=${flightAPI}&type=departure&iataCode=${city}&date=${date}`;

  fetch(flightInfo)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var flightData = data.slice(0, 50);
      flightData.forEach(function (flight) {
        var flightNumber = `Flight number: ` + flight.flight.iataNumber;
        var departureTime = `Departure time: ` + flight.departure.scheduledTime;
        var gateTerminal =
          `Leaving from gate: ` +
          flight.departure.gate +
          "  " +
          `Terminal: ` +
          flight.departure.terminal;

        var listOfFlights = document.createElement("li");
        listOfFlights.innerHTML =
          flightNumber + "<br>" + departureTime + "<br>" + gateTerminal;

        flightList.appendChild(listOfFlights);

        var arrivalCode = flight.arrival.iataCode;
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
            listOfFlights.innerHTML +=
              "<br>" +
              arrivalCodeCity +
              "<br>" +
              arrivalNameCity +
              "<br>" +
              arrivalCountry;
          });
      });
    });
}

flightSearchButton.addEventListener("click", searchFlights);
