// Input containers
var dateInput = document.getElementById("date-input");
var cityInput = document.querySelector("#city-input");
var flightList = document.getElementById("list-flights");
var covidInfo = document.getElementById("covid-info");

// Buttons
var flightSearchButton = document.getElementById("flight-search-button");
var searchButton = document.getElementById("covid-search-button");
var resetFlights = document.getElementById("reset-flights");

// Covid section

var countryInput = document.getElementById("country-input");

searchButton.addEventListener("click", function () {
  var countryName = countryInput.value;

  var requestUrl =
    "https://disease.sh/v3/covid-19/countries/" + countryName + "?strict=true";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var countryName = "Country: " + data.country;
      var countryContinent = "Continent: " + data.continent;
      var countryPopulation = "Population: " + data.population;
      var countryCovidCases = "Cases: " + data.cases;
      var countryCovidActiveCases = "Active: " + data.active;

      // List creation for covid info.
      var covidInfoList = document.createElement("li");

      covidInfo.innerHTML = "";
      covidInfoList.innerHTML =
        countryName +
        "<br>" +
        countryContinent +
        "<br>" +
        countryPopulation +
        "<br>" +
        countryCovidCases +
        "<br>" +
        countryCovidActiveCases;

      covidInfoList.classList.add("covid-info-item");
      covidInfo.appendChild(covidInfoList);
    });
});

// Flight API function
function searchFlights() {
  // API KEY
  const flightAPI = "59de1f-88c9f9";

  // City IATA API
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
  // Did this to reformat the value coming from calender input
  var date = dateInput.date.Date.toISOString().split("T")[0];
  console.log(date);

  // Flight info API
  var flightInfo = `https://aviation-edge.com/v2/public/flightsFuture?key=${flightAPI}&type=departure&iataCode=${city}&date=${date}`;

  fetch(flightInfo)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var flightData = data.slice(0, 10);
      flightData.forEach(function (flight) {
        var flightNumber = `Flight number: ` + flight.flight.iataNumber;
        var departureTime = `Departure time: ` + flight.departure.scheduledTime;
        var gateTerminal =
          `Leaving from gate: ` +
          flight.departure.gate +
          "  " +
          `Terminal: ` +
          flight.departure.terminal;

        // List creation for flight info.

        //Function to obtain information from list item we click on
        var listOfFlights = document.createElement("li");
        listOfFlights.addEventListener("click", function () {
          var selectedFlight = event.target;
          var selectedFlightText = selectedFlight.textContent;
          console.log(selectedFlightText);
          //Event Listener for Save button click
          document
            .getElementById("save-flight-button")
            .addEventListener("click", function () {
              console.log("Saving");

              //Save selected flight to local storage
              // var savedFlights = (() => {
              //   var flightsSaved = localStorage.getItem("specificFlights");
              //   return flightsSaved === null
              //   ? []
              //   : JSON.parse(flightsSaved);
              // })();
              // savedFlights.push(selectedFlightText);
              // localStorage.setItem("specificFlights", JSON.stringify(savedFlights));
              localStorage.setItem("specificFlights", selectedFlightText);
            });
        });

        listOfFlights.textContent =
          flightNumber + "\n" + departureTime + "\n" + gateTerminal;

        flightList.appendChild(listOfFlights);

        // City code API used again for arrival info.

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

// Click function to search for flights.
flightSearchButton.addEventListener("click", searchFlights);

resetFlights.addEventListener("click", () => {
  window.location.reload();
});
