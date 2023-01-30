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
    .then (function (response){
      console.log(response);
      if (response.ok){
        response.json().then(function (data){
          console.log(data);
          var lat = data[0].lat;
          var lon = data[0].lon;
          console.log(lat);
          console.log(lon);
          getWeather(lat,lon);
        })
      }
    else {
      alert('Error: ' + response.statusText);
    }
    })
}

var getWeather = function (lat,lon) {
  var apiURL = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=0d990e0dff1f939ceefa0f13e3b23ec6';

  fetch (apiURL)
    .then (function (response){
      console.log(response);
      if (response.ok){
        response.json().then(function (data){
          var location = data.list;
          console.log(data);
          console.log(location);
        })
      }
    })
}
//var apiUrl = `${weatherApiRootUrl}/geo/1.0/direct?q=${search}&limit=5&appid=${weatherApiKey}`;
//var apiUrl = `${weatherApiRootUrl}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${weatherApiKey}`;
searchBtn.addEventListener('click', buttonClickHandler);