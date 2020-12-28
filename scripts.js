// Establishes a new header object with the Authorization and Bearer to retrieve Yelp data
const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer xrx7guNquPIQiWMzWI0ZHWFoRi9Maw8VDy7mFBzpUjVVhWgW5E7LxPaOBMuPDWxWTC3Rd5m9MeU6q6tn8NkdPfS4z36MHeUGY6_OhGK-ZSIVp5Ss2Hdt1oJ3QALNX3Yx");

const requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

// global yelpData store array that gets updated when the user clicks on a map marker
let yelpData = {};

// Fetches weather data based on which city is selected on the map
function getWeatherData(city) {
  const root = 'https://api.weatherbit.io/v2.0/forecast/daily?city=';
  const key = ',CO&key=7b9c18c9fd2f453094f58a867fafa27c'
  const url = `${root}${city}${key}`;
  return fetch(url).then(data => data.json()).catch(error => alert(error));
}


// Fetches Yelp data based on which city is selected on the map
function getYelpData(city) {
    const yelpRoot = "https://api.yelp.com/v3/businesses/search\n?location="
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const yelpUrl = `${proxyurl}${yelpRoot}${city} + ',co'`
    return fetch(yelpUrl, requestOptions)
    .then(data => data.json()).catch(error => alert(error));
}

//Event Listeners
function startMap() {
  $('section').on('click', '#showMap-btn', function (event){
      showMapSection();
  })
}

function getYelpHandler() {
    $('main').on('click', '.showYelp-btn', function (event){
        addSortButton();
        renderYelpSection();
        enableSortButton();
    })
}

function sortHandler() {
    $('main').on('click', '.sort-rating-btn', function (event){
        sortYelpByRating()
        renderYelpSection()
        disableSortButton()
    })
}

//Creates a leaflet object to render the map. It also sets the view to Colorado's lat/long, adds img tiles, and adds other various properties to the map.
var mymap = L.map('mapid').setView([39.2084, -106.9491], 7);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoia2ozc3RhY2tzIiwiYSI6ImNraTgxZGM5cTAxYzYyc29hNmJwdHg1cHMifQ.GtyrfOTWYSdrz6TP-tZVQA'
}).addTo(mymap);

//Adds 6 markers to the leaflet object. On click of a marker the weather data is fetched and then displayed on the dom. The yelp data is also fetched for that city and stored in the global yelpData Array.
  
L.marker([39.4817, -106.0384], { id: "Breckenridge" })
  .addTo(mymap)
  .bindPopup("<b>Breckenridge</b>", {autoClose: false})
  .on("click", function(event) {
    showWeather();
    var id = event.target.options.id;
    getWeatherData(id).then(function(data) {
      updateWeatherDom(data);
        })
    getYelpData(id).then(function(data) {
      yelpData = data;
        });
});

L.marker([39.6403, -106.3742], { id: "Vail" })
    .addTo(mymap)
    .bindPopup("<b>Vail</b>", {autoClose: false})
    .on("click", function(event) {
      showWeather();
      var id = event.target.options.id;
      getWeatherData(id).then(function(data) {
        updateWeatherDom(data);
          })
      getYelpData(id).then(function(data) {
        yelpData = data;
          });
});

L.marker([39.2084, -106.9491], { id: "Aspen" })
    .addTo(mymap)
    .bindPopup("<b>Aspen Snowmass</b>", {autoClose: false})
    .on("click", function(event) {
      showWeather();
      var id = event.target.options.id;
      getWeatherData(id).then(function(data) {
        updateWeatherDom(data);
          })
      getYelpData(id).then(function(data) {
        yelpData = data;
          });
});

  L.marker([37.9375, -107.8123], { id: "Telluride" })
    .addTo(mymap)
    .bindPopup("<b>Telluride</b>")
    .on("click", function(event) {
      showWeather();
      var id = event.target.options.id;
      getWeatherData(id).then(function(data) {
        updateWeatherDom(data);
          })
      getYelpData(id).then(function(data) {
        yelpData = data;
          });
});

L.marker([40.4850, -106.8317], { id: "Steamboat Springs" })
    .addTo(mymap)
    .bindPopup("<b>Steamboat Springs</b>")
    .on("click", function(event) {
      showWeather();
      var id = event.target.options.id;
      getWeatherData(id).then(function(data) {
        updateWeatherDom(data);
          })
      getYelpData(id).then(function(data) {
        yelpData = data;
          });
});

L.marker([39.8868, -105.7625], { id: "Fraser" })
    .addTo(mymap)
    .bindPopup("<b>Winter Park, Fraser</b>")
    .on("click", function(event) {
      showWeather();
      var id = event.target.options.id;
      getWeatherData(id).then(function(data) {
        updateWeatherDom(data);
          })
      getYelpData(id).then(function(data) {
        yelpData = data;
          });
});

//work-around to fix the resizing of the leaflet map on page load after 1/10th of a second. 
setInterval(function () {
        mymap.invalidateSize();
}, 100);

// Updates the yelp section with data from the yelp fetch call.
function renderYelpSection() {
  $('.yelp-list').html('');
  yelpData.businesses.forEach(business => {
    $('.yelp-list').append(`<li class='yelp-card result'>
      <div class='yelp-heading'>
      <h2 class="yelpRest-name">${business.name}</h2>
      <p>Number of stars: ${business.rating}</p>
      </div>
      <div class='yelp-content'>
      <p>Price: ${business.price}</p>
      <p>Address: ${business.location.display_address}</p>
      <p>Phone: ${business.display_phone}</p>
      <p>Cuisine Type: ${business.categories[0].title}</p>
      <a href="${business.url}" target="_blank">${business.name} website</a>
      </div>
      </li>`)       
       });
}
  
// Updates the weather section with data from the weather fetch call.
function updateWeatherDom(data) {
  $(".city-name").html(data.city_name);
  $(".snow-acc").html('Projected total snow for next 16 days: ' + getTotalSnowAcc(data) + ' in');
  $(".hi").html('High: ' + getHiTemp(data) + ' F');
  $(".low").html('Low: ' + getLowTemp(data) + ' F');
  $(".todays-snow").html('Snow for next 24 hours: ' + getTodaysSnow(data) + ' in');
  $(".twoDay-snow").html('Snow for next 48 hours: ' + getTwoDaySnow(data) + ' in');
  $(".description").html('Todays weather: ' +getDescription(data));
  getResortLink();
}

// Mutates the Yelp array by sorting the restaurants in descending order according to their rating.
function sortYelpByRating() {
  yelpData.businesses.sort((a, b) => {
   return b.rating - a.rating;
 })
}

// Functions that return certain pieces of data pertaining to either Yelp or the weather.
function getTotalSnowAcc(chosenCity) {
   let totalSnow = chosenCity.data.reduce((acc, day) => {
     acc += day.snow
     return acc
    },0)
    return Math.round(totalSnow * 0.0393701);
}

function getTodaysSnow(chosenCity) {
  return Math.round(chosenCity.data[0].snow * 0.0393701)
}

function getTwoDaySnow(chosenCity) {
    let snowCount = Math.round(chosenCity.data[0].snow * 0.0393701) + Math.round(chosenCity.data[1].snow * 0.0393701);
    return snowCount;
}

function getHiTemp(chosenCity) {
    let hiTemp = Math.round(chosenCity.data[0].max_temp * 9/5 + 32);
    return hiTemp;
}

function getLowTemp(chosenCity) {
    let loTemp = Math.round(chosenCity.data[0].min_temp * 9/5 + 32);
    return loTemp
  }

function getDescription(chosenCity) {
  return chosenCity.data[0].weather.description
}

function getResortLink() {
    if($(".city-name").text() === 'Breckenridge') {
        $(".resort-link").html('<a href="https://www.breckenridge.com/" target="_blank">Breckenridge Website</a>')
    }
    if($(".city-name").text() === 'Vail') {
        $(".resort-link").html('<a href="https://www.vail.com/" target="_blank">Vail Website</a>')
    }
    if($(".city-name").text() === 'Aspen') {
        $(".resort-link").html('<a href="https://www.aspensnowmass.com/" target="_blank">Aspen Website</a>')
    }
    if($(".city-name").text() === 'Telluride') {
        $(".resort-link").html('<a href="https://tellurideskiresort.com/" target="_blank">Telluride Website</a>')
    }
    if($(".city-name").text() === 'Steamboat Springs') {
        $(".resort-link").html('<a href="https://www.steamboat.com/" target="_blank">Steamboat Springs Website</a>')
    }
    if($(".city-name").text() === 'Fraser') {
        $(".resort-link").html('<a href="https://www.winterparkresort.com/" target="_blank">Winter Park Website</a>')
    }
}

function disableSortButton() {
  $('.sort-rating-btn').disabled = true;
  $('.sort-rating-btn').addClass("disabled-btn")
}

function enableSortButton() {
  $('.sort-rating-btn').disabled = false;
  $('.sort-rating-btn').removeClass("disabled-btn")
}

// Functions that hide and show elements on the page
function showWeather() {
  $( ".select" ).addClass( "hidden" )
  $( ".weather-aside" ).removeClass( "hidden" )
}

function showMapSection() {
    $( ".landing-page" ).addClass( "hidden");
    $( ".resort-map" ).removeClass( "hidden");
}

function addSortButton() {
  $( ".sort-rating-btn" ).removeClass( "hidden" )
}

// Functions to update the DOM
function renderDom() {
  startMap();
  getYelpHandler();
  sortHandler();
}

$(renderDom);

