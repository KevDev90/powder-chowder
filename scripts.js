
function getData(city) {
    const root = 'https://api.weatherbit.io/v2.0/forecast/daily?city=';
    const key = ',CO&key=7b9c18c9fd2f453094f58a867fafa27c'
    const url = `${root}${city}${key}`;
    return fetch(url).then(data => data.json());
}

const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer xrx7guNquPIQiWMzWI0ZHWFoRi9Maw8VDy7mFBzpUjVVhWgW5E7LxPaOBMuPDWxWTC3Rd5m9MeU6q6tn8NkdPfS4z36MHeUGY6_OhGK-ZSIVp5Ss2Hdt1oJ3QALNX3Yx");

const requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};


function getYelpData(city) {
    const yelpRoot = "https://api.yelp.com/v3/businesses/search\n?location="
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const yelpUrl = `${proxyurl}${yelpRoot}${city}`
    return fetch(yelpUrl, requestOptions)
    .then(data => data.json());
}

function getYelpHandler() {
    $('main').on('click', '.showYelp-btn', function (event){
        showResultSection();
        const val = $('.city-name').text();
        console.log(val)
        getYelpData(val).then(function(data) {
            console.log(data, 'yelp-data')
             data.businesses.forEach(business => {
                $('.yelp-list').append(`<li>
        <h2 class="yelpRest-name">${business.name}</h2>
        <p>Number of stars: ${business.rating}</p>
        <p>Price: ${business.price}</p>
        <p>Address: ${business.location.display_address}</p>
        <p>Phone: ${business.display_phone}</p>
      </li>`)
            })
        })
    })
}

var mymap = L.map('mapid').setView([39.5501, -105.7821], 7);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoia2ozc3RhY2tzIiwiYSI6ImNraTgxZGM5cTAxYzYyc29hNmJwdHg1cHMifQ.GtyrfOTWYSdrz6TP-tZVQA'
}).addTo(mymap);
  
  L.marker([39.4817, -106.0384], { id: "Breckenridge" })
    .addTo(mymap)
    .bindPopup("<b>Breckenridge</b>")
    .on("click", function(event) {
      var id = event.target.options.id;
      getData(id).then(function(data) {
          console.log(data)
          $(".city-name").html(data.city_name)
          $(".snow-acc").html(getTotalSnowAcc(data))
          $(".hi-low").html(getTemps(data))
          $(".description").html(getDescription(data))
      })
  })

  L.marker([39.6403, -106.3742], { id: "Vail" })
    .addTo(mymap)
    .bindPopup("<b>Vail</b>")
    .on("click", function(event) {
        var id = event.target.options.id;
        console.log(event.target.options.id)
    })

  L.marker([39.2084, -106.9491], { id: "Aspen" })
    .addTo(mymap)
    .bindPopup("<b>Aspen Snowmass</b>")
    .on("click", function(event) {
        var id = event.target.options.id;
        console.log(event.target.options.id)
    })

  L.marker([37.9375, -107.8123], { id: "Telluride" })
    .addTo(mymap)
    .bindPopup("<b>Telluride</b>")
    .on("click", function(event) {
        var id = event.target.options.id;
        console.log(event.target.options.id)
    })

  L.marker([40.4850, -106.8317], { id: "Steamboat Springs" })
    .addTo(mymap)
    .bindPopup("<b>Steamboat Springs</b>")
    .on("click", function(event) {
        var id = event.target.options.id;
        console.log(event.target.options.id)
    })

  L.marker([39.8868, -105.7625], { id: "Winter Park" })
    .addTo(mymap)
    .bindPopup("<b>Winter Park</b>")
    .on("click", function(event) {
        var id = event.target.options.id;
        console.log(event.target.options.id)
    })
    // workaround to display leaflet popups by default, look into this more
    // var markers = [
    //     {pos: [39.4817, -106.0384], id: "Breckenridge", popup: "<b>Breckenridge</b>"},
    //     // {pos: [51.50, -0.09], popup: "This is the popup for marker #2"},
    //     // {pos: [51.49, -0.08], popup: "This is the popup for marker #3"}];
    // ];
    // markers.forEach(function (obj) {
    //     var m = L.marker(obj.pos).addTo(mymap),
    //         p = new L.Popup({ autoClose: false, closeOnClick: false })
    //                 .setContent(obj.popup)
    //                 .setLatLng(obj.pos);
    //                 m.bindPopup(p).openPopup().on("click", function(event) {
    //                     var id = event.target.options.id;
    //                     console.log(id)
    //                     getData(id).then(function(data) {
    //                         console.log(data)
    //                         $(".city-name").html(data.city_name)
    //                     })
    //                 });
    // })

    setInterval(function () {
        mymap.invalidateSize();
     }, 100);

function getTotalSnowAcc(chosenCity) {
    console.log(chosenCity, 'lookyhere')
    let totalSnow = chosenCity.data.reduce((acc, day) => {
        acc += day.snow
 return acc
    },0)
    console.log(totalSnow)
   return totalSnow
}

function getTemps(chosenCity) {
  let temps = [];
  let hiTemp = chosenCity.data[0].max_temp * 9/5 + 32;
  let loTemp = chosenCity.data[0].min_temp * 9/5 + 32;
  temps.push(hiTemp)
  temps.push(loTemp)
  console.log(temps)
  return temps
}

function getDescription(chosenCity) {
    console.log(chosenCity.data[0].weather.description)
  return chosenCity.data[0].weather.description
}

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
    getYelpHandler()
}

$(renderDom)

