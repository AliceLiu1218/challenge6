var cityInputEl = document.querySelector("#cityInput")
var searchBtn = document.querySelector("#searchButton");
var searchRecord = document.querySelector("#historyContainer");

var buttonClickHandler = function (event) {
    event.preventDefault();
    
    var city = cityInputEl.value.trim();
    console.log(cityInputEl.value);
    if (city) {
        getGeoCoordination(city);

       // Append search history
        var cityEl = document.createElement("button");
        cityEl.classList = "btn btn-secondary btn-city";
        cityEl.innerHTML = city;
        searchRecord.appendChild(cityEl);
        
        //clear input value
        cityInputEl.value = '';
       
      } else {
        alert('Please enter a city name');
      }
}

var getGeoCoordination = function (city) {
  // get lat,lon
  var lanlonURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=0d990e0dff1f939ceefa0f13e3b23ec6';
  //var apiURL = api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

  fetch(lanlonURL)
    .then (function (reponse){
      console.log(reponse);
      if (response.ok){
        response.json().then(function (data){
          console.log(data);
        })
      }
    else {
      alert('Error: ' + response.statusText);
    }
    })
}


searchBtn.addEventListener('click', buttonClickHandler);