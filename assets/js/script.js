// Input containers
var dateInput = document.getElementById("date-input");
var cityInput = document.querySelector("#city-input");
var flightList = document.getElementById("list-flights");
var covidInfo = document.getElementById("covid-info");
var spinner = document.getElementById("spinner");
var spinner2 = document.getElementById("spinner2");
var countryInput = document.getElementById("country-input");
var selectedFlightsArray = JSON.parse(window.localStorage.getItem("specificFlights")) || [];

// Buttons
var flightSearchButton = document.getElementById("flight-search-button");
var searchButton = document.getElementById("covid-search-button");
var resetFlights = document.getElementById("reset-flights");

// Spinner
function showSpinner() {
  spinner.style.display = "block";
}

function blockSpinner() {
  spinner.style.display = "none";
}

function showSpinner2() {
  spinner2.style.display = "block";
}

function blockSpinner2() {
  spinner2.style.display = "none";
}

// Covid section

searchButton.addEventListener("click", function () {
  var countryName = countryInput.value;
  var requestUrl =
    "https://disease.sh/v3/covid-19/countries/" + countryName + "?strict=true";
  showSpinner2();
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var countryName = "Country: " + data.country;
      var countryPopulation = "Population: " + data.population;
      var countryCovidCases = "Cases: " + data.cases;
      var countryCovidActiveCases = "Active: " + data.active;

      // List creation for covid info.
      var covidInfoList = document.createElement("li");
      blockSpinner2();
      covidInfo.innerHTML = "";
      covidInfoList.innerHTML =
        countryName +
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
  showSpinner();
  // City IATA API
  var city = cityInput.value;
  var cities = `https://aviation-edge.com/v2/public/airportDatabase?key=${flightAPI}&codeIataAirport=${city}`;
  fetch(cities)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var cityCode = `City code: ` + data[0].codeIataCity;
      var nameCity = `City name: ` + data[0].timezone;
      var country = `Country:  ` + data[0].nameCountry;

      var cityCode = data[0].codeIataCity;
    });
  // Did this to reformat the value coming from calender input
  var date = dateInput.date.Date.toISOString().split("T")[0];

  // Flight info API
  var flightInfo = `https://aviation-edge.com/v2/public/flightsFuture?key=${flightAPI}&type=departure&iataCode=${city}&date=${date}`;
  
  fetch(flightInfo)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
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

        
  //Function to obtain information from list item we click on
  var listOfFlights = document.createElement("li"); 
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

            blockSpinner();
            
            // List creation for flight info.
            listOfFlights.textContent =
            flightNumber + "\n" + departureTime + "\n" + gateTerminal + "\n" + arrivalCodeCity + "\n" + arrivalNameCity + "\n" + arrivalCountry;
  
            flightList.appendChild(listOfFlights);

            listOfFlights.addEventListener("click", function () {
              var selectedFlight = event.target;
              event.target.style.background = 'gray';
              event.target.style.color = 'white';
              var selectedFlightText = selectedFlight.textContent;
              var myobj = {
                flightNumber: flight.flight.iataNumber,
                depatureTime: flight.departure.scheduledTime,
                gate: flight.departure.gate,
                terminal: flight.departure.terminal,
                arrCode: data[0].codeIataCity,
                arrCityName: data[0].timezone,
                arrCountry: data[0].nameCountry
              } 
              //Event Listener for Save button click
              document.getElementById("save-flight-button").addEventListener("click", function () {
                //if condition to check if array contains the selected flight
                if(!selectedFlightsArray.find(item => item.flightNumber === flight.flight.iataNumber)){
                selectedFlightsArray.push(myobj)
                };
              window.localStorage.setItem("specificFlights", JSON.stringify(selectedFlightsArray));
            });
            });
          });
      });
    });
}

// Click function to search for flights.
flightSearchButton.addEventListener("click", searchFlights);

resetFlights.addEventListener("click", () => {
  window.location.reload();
});