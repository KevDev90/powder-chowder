// code to render leaflet.js map
var mymap = L.map('mapid').setView([39.5501, -105.7821], 9);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoia2ozc3RhY2tzIiwiYSI6ImNraTgxZGM5cTAxYzYyc29hNmJwdHg1cHMifQ.GtyrfOTWYSdrz6TP-tZVQA'
}).addTo(mymap);
  L.marker([39.4817, -106.0384]).addTo(mymap).bindPopup("<b>Breckenridge</b>")
  L.marker([39.6403, -106.3742]).addTo(mymap).bindPopup("<b>Vail</b>")
  L.marker([39.2084, -106.9491]).addTo(mymap).bindPopup("<b>Aspen Snowmass</b>")
  L.marker([37.9375, -107.8123]).addTo(mymap).bindPopup("<b>Telluride</b>")
  L.marker([40.4850, -106.8317]).addTo(mymap).bindPopup("<b>Steamboat Springs</b>")
  L.marker([39.5792, -105.9347]).addTo(mymap).bindPopup("<b>Keystone</b>")

// const mymap = L.map('mapid').setView([39.5501, -105.7821], 8);
// const attribution ='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
//   const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
//   const tiles = L.tileLayer(tileUrl, { attribution });
//   tiles.addTo(mymap);
//   L.marker([39.4817, -106.0384]).addTo(mymap).bindPopup("<b>Breckenridge</b>")
//   L.marker([39.6403, -106.3742]).addTo(mymap).bindPopup("<b>Vail</b>")
//   L.marker([39.2084, -106.9491]).addTo(mymap).bindPopup("<b>Aspen Snowmass</b>")
//   L.marker([37.9375, -107.8123]).addTo(mymap).bindPopup("<b>Telluride</b>")
//   L.marker([40.4850, -106.8317]).addTo(mymap).bindPopup("<b>Steamboat Springs</b>")
//   L.marker([39.5792, -105.9347]).addTo(mymap).bindPopup("<b>Keystone</b>")

const weatherbitKey = '7b9c18c9fd2f453094f58a867fafa27c';

const weatherData = {
    resorts: {}
}

let breckData = getData('Breckenridge');
    
let vailData = getData('Vail');

let aspenData = getData('Aspen');

let tellurideData = getData('Telluride');

let steamboatData = getData('Steamboat-Springs');

let keystoneData = getData('Keystone');
    
function getData(city) {
    const root = 'https://api.weatherbit.io/v2.0/forecast/daily?city=';
    const key = ',CO&key=7b9c18c9fd2f453094f58a867fafa27c'
    const url = `${root}${city}${key}`;
    const promise = fetch(url)
        .then(data => data.json());
        return promise;
    }

Promise.all([ keystoneData, steamboatData, tellurideData, aspenData, vailData, breckData]).then(promises => {
    const [ keystoneData, steamboatData, tellurideData, aspenData, vailData, breckData] = promises;

  updateWeatherState(promises)// update on each of the promises/city
}).catch(error => console.log(error.message));
  

function updateWeatherState(promises) {
    promises.forEach(city => {
        weatherData.resorts[city.city_name] = city.data;
    })
    getChosenCity('Vail') // get this argument dynamically when clicking on resort?
    // make helper function 
    // go through one city, do calculations needed for that city, figure out what display looks like
}   // updates state, updating an obj with citys data

function getChosenCity(city) {
    console.log(weatherData)  
  const chosenCity = weatherData.resorts[city]
  console.log(chosenCity, 'chosenCity')
   getDescription(chosenCity)
   getTemps(chosenCity)
   getTotalSnowAcc(chosenCity)
  return chosenCity
}

function getTotalSnowAcc(chosenCity) {
    let totalSnow = chosenCity.reduce((acc, day) => {
        acc += day.snow
 return acc
    },0)
    console.log(totalSnow)
   return totalSnow
}

function getTemps(chosenCity) {
  let temps = [];
  let hiTemp = chosenCity[0].max_temp * 9/5 + 32;
  let loTemp = chosenCity[0].min_temp * 9/5 + 32;
  temps.push(hiTemp)
  temps.push(loTemp)
  console.log(temps)
  return temps
}

function getDescription(chosenCity) {
    console.log(chosenCity[0].weather.description)
  return chosenCity[0].weather.description
}

// no access to chosenCity here
function addWeatherToDom() {
    $( ".snow-acc" ).append(`"${getTotalSnowAcc(chosenCity)}"`)
    $( ".high-low" ).append(`"${getTemps(chosenCity)}"`)
    $( ".description" ).append(`"${getDescription(chosenCity)}"`)
}

function startMap() {
    $('main').on('click', '#showMap-btn', function (event){
        showMapSection();
        // addWeatherToDom();
    })
}

function showResults() {
    $('main').on('click', '#showResults-btn', function (event){
        showResultSection();
    })
}

function showMapSection() {
    $( ".landing-page" ).addClass( "hidden" )
    $( ".results-page" ).addClass( "hidden" )
    $( ".resort-map" ).removeClass( "hidden" )
}

function showResultSection() {
    $( ".landing-page" ).addClass( "hidden")
    $( ".resort-map" ).addClass( "hidden")
    $( ".results-page" ).removeClass( "hidden")
}
function renderDom() {
    startMap()
    showResults()
}
$(renderDom)