
//Local Storage getting the information and displaying on site
function printSaveFlights() {
  var selectedFlightsArray = JSON.parse(window.localStorage.getItem("specificFlights")) || [];
  //Function that appends the list of flights 
  selectedFlightsArray.forEach(function(flightList) {
    var liSaveFlights = document.createElement("li");
    liSaveFlights.textContent = "Flight: " + flightList.flightNumber + 
    " Departure Time: " + flightList.depatureTime + "\n" +
    " Gate: " + flightList.gate +
    " Terminal: " + flightList.terminal + 
    " Country Code: " + flightList.arrCode + "\n" +
    " Country: " + flightList.arrCityName +
    " City Name: " + flightList.arrCountry
    ;
    var olEl = document.getElementById("saved-flights-list");
    olEl.appendChild(liSaveFlights);
  });
}

printSaveFlights();

//Local storage clear button
document.getElementById("clear").addEventListener("click", function () {
  localStorage.clear();
  window.location.reload();
});

// Buttons

var backBtn = document.querySelector("#backButton");

backBtn.addEventListener("click", function () {
  location.href = "index.html";
});