// code to render leaflet.js map
const mymap = L.map('mapid').setView([39.5501, -105.7821], 8);
const attribution ='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const tiles = L.tileLayer(tileUrl, { attribution });
  tiles.addTo(mymap);
  L.marker([39.4817, -106.0384]).addTo(mymap).bindPopup("<b>Breckenridge</b>")
  L.marker([39.6403, -106.3742]).addTo(mymap).bindPopup("<b>Vail</b>")
  L.marker([39.2084, -106.9491]).addTo(mymap).bindPopup("<b>Aspen Snowmass</b>")
  L.marker([37.9375, -107.8123]).addTo(mymap).bindPopup("<b>Telluride</b>")
  L.marker([40.4850, -106.8317]).addTo(mymap).bindPopup("<b>Steamboat Springs</b>")
  L.marker([39.5792, -105.9347]).addTo(mymap).bindPopup("<b>Keystone</b>")

const weatherbitKey = '7b9c18c9fd2f453094f58a867fafa27c';

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
    console.log(keystoneData, promises)

//   keystoneData = promises[0];
//   steamboatData = promises[1];
//   tellurideData = promises[2];
//   aspenData = promises[3];
//   vailData = promises[4];
//   breckData = promises[5];
  updateWeather(promises)// update on each of the promises/city
}).catch(error => console.log(error.message));
  

function updateWeatherState(promises) {
    const weatherData = [];
    promises.forEach(promise => {
        console.log(promise)
    })
    // make helper function 
    // go through one city, do calculations needed for that city, figure out what display looks like
}   // updates state, updating an obj with citys data

function startMap() {
    $('main').on('click', '#showMap-btn', function (event){
        showMapSection();
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