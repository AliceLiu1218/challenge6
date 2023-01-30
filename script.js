var cityInputEl = document.querySelector("#cityInput")
var searchBtn = document.querySelector("#searchButton");
var searchRecord = document.querySelector("#historyContainer");
var day1 = document.querySelector("#day1");

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
          populate(data);
        })
      }
    })
}

var populate = function (data) {
  
  var date = data.list[0].dt_txt;
  var temp = data.list[0].main.temp;
  var wind = data.list[0].wind.speed;
  var humidity = data.list[0].main.humidity;
  var date1 = document.querySelector("#date-1");
  date1.textContent = cityInputEl + date;
  var temp1 = document.querySelector("#temp-1");
  temp1.textContent =temp;
  var wind1 = document.querySelector("#wind-1");
  wind1.textContent = wind;
  var humidity1 = document.querySelector("#humidity-1");
  humidity1.textContent = humidity;
  var day1 = document.querySelector("#day1");
  day1.append(date1);
  day1.append(temp1);
  day1.append(wind1);
  day1.append(humidity1);

  for (var i=0;i<6;i++){
    var date = data.list[i].dt_txt;
    var temp = data.list[i].main.temp;
    var wind = data.list[i].wind.speed;
    var humidity = data.list[i].main.humidity;

    var day1 = document.querySelector(`#day${i}`);

    var date1 = document.querySelector(`#date-${i}`);
    date1.textContent = cityInputEl + date;

    var temp1 = document.querySelector(`#temp-${i}`);
    temp1.textContent ='Temp: ' + temp;

    var wind1 = document.querySelector(`#wind-${i}`);
    wind1.textContent ='Wind: ' +  wind;

    var humidity1 = document.querySelector(`#humidity-${i}`);
    humidity1.textContent ='Humidity:' + humidity;

    day1.append(date1);
    day1.append(temp1);
    day1.append(wind1);
    day1.append(humidity1);
  }
}
searchBtn.addEventListener('click', buttonClickHandler);