

//Local Storage getting the information and displaying on site
function printSaveFlights() {
  var selectedFlightsArray = JSON.parse(window.localStorage.getItem("specificFlights")) || [];
  //function that sorts flights according to value
  // selectedFlightsArray.sort(function(a, b) {
  //   return a.flightNumber - b.flightNumber;
  // });
  selectedFlightsArray.forEach(function(flightList) {
    var liSaveFlights = document.createElement("li");
    liSaveFlights.textContent = "Flight: " + flightList.flightNumber + 
    " Departure Time: " + flightList.departureTime + 
    " Gate: " + flightList.gate
    " Terminal: " + flightList.terminal
    " Country Code: " + flightList.arrCode
    " Country: " + flightList.arrCityName
    " City Name: " + flightList.arrCountry
    ;
    var olEl = document.getElementById("saved-flights-list");
    olEl.appendChild(liSaveFlights);
  });
}








printSaveFlights();

// //Local storage clear button
// document.getElementById("clear-save-flights").addEventListener("click", function () {
//   console.log("Clearing");
//   localStorage.clear();
// });

// // Clearing Highscore by wiping local storage
// function clearSelectFlights() {
//   window.localStorage.removeItem("selectedFlights");
//   window.location.reload();
// }

// document.getElementById("clear-save-flights").onclick = clearSelectFlights;