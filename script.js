var cityInputEl = document.querySelector("#cityInput")
var searchBtn = document.querySelector("#searchButton");
var searchRecord = document.querySelector("#historyContainer");
//console.log(cityInputEl.value);

var buttonClickHandler = function (event) {
    event.preventDefault();
    
    var city = cityInputEl.value.trim();
    console.log(cityInputEl.value);
    if (city) {
        //getWeather(city);

        var cityEl = document.createElement("button");
        cityEl.classList = "btn btn-secondary";
        cityEl.innerHTML = city;
        searchRecord.appendChild(cityEl);

        //<button type="button" class="btn btn-secondary">Secondary</button>
        //<a href="#" class="list-group-item list-group-item-action list-group-item-primary">A simple primary list group item</a>
        //repoContainerEl.textContent = '';
       // cityInputEl.value = '';
       
      } else {
        alert('Please enter a city name');
      }
}

var getWeather = function (city) {
   // var apiURL = 
}


searchBtn.addEventListener('submit', buttonClickHandler);