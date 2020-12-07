// code to render leaflet.js map
const mymap = L.map('mapid').setView([39.5501, -105.7821], 7);
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