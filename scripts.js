
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

let yelpData = {};

function getYelpData(city) {
    const yelpRoot = "https://api.yelp.com/v3/businesses/search\n?location="
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const yelpUrl = `${proxyurl}${yelpRoot}${city} + ',co'`
    return fetch(yelpUrl, requestOptions)
    .then(data => data.json());
}

function getYelpHandler() {
    $('main').on('click', '.showYelp-btn', function (event){
        showResultSection();
        renderYelpSection()
    })
}

function renderYelpSection() {
    console.log(yelpData)
    $('.yelp-list').html('');
    yelpData.businesses.forEach(business => {
        $('.yelp-list').append(`<li>
            <h2 class="yelpRest-name">${business.name}</h2>
            <p>Number of stars: ${business.rating}</p>
            <p>Price: ${business.price}</p>
            <p>Address: ${business.location.display_address}</p>
            <p>Phone: ${business.display_phone}</p>
            </li>`)
    })
}
// have this return a template fn instead of doing all these jquery fns
function updateWeatherDom(data) {
    console.log(data)
    $(".city-name").html(data.city_name)
    $(".snow-acc").html('Projected total snow for next 16 days: ' + getTotalSnowAcc(data) + ' in')
    $(".hi").html('High: ' + getHiTemp(data) + ' F')
    $(".low").html('Low: ' + getLowTemp(data) + ' F')
    $(".todays-snow").html('Snow for next 24 hours: ' + getTodaysSnow(data) + ' in')
    $(".twoDay-snow").html('Snow for next 48 hours: ' + getTwoDaySnow(data) + ' in')
    $(".description").html('Todays weather: ' +getDescription(data))
    getResortLink();
    
}

var mymap = L.map('mapid').setView([39.2084, -106.9491], 7);
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
    .bindPopup("<b>Breckenridge</b>", {autoClose: false})
    .on("click", function(event) {
        showWeather()
        var id = event.target.options.id;
        getData(id).then(function(data) {
            updateWeatherDom(data)
        })
        getYelpData(id).then(function(data) {
            yelpData = data;
        })
    })

  L.marker([39.6403, -106.3742], { id: "Vail" })
    .addTo(mymap)
    .bindPopup("<b>Vail</b>", {autoClose: false})
    // .openPopup()
    .on("click", function(event) {
    showWeather()
    var id = event.target.options.id;
    getData(id).then(function(data) {
      updateWeatherDom(data)
    })
    console.log(id, 'vailID')
    getYelpData(id).then(function(data) {
        console.log(data, 'yelpData')
        yelpData = data;
    })
})

  L.marker([39.2084, -106.9491], { id: "Aspen" })
    .addTo(mymap)
    .bindPopup("<b>Aspen Snowmass</b>", {autoClose: false})
    // .openPopup()
    .on("click", function(event) {
    showWeather()
    var id = event.target.options.id;
    getData(id).then(function(data) {
      updateWeatherDom(data)
    })
    console.log(id, 'aspenID')
    getYelpData(id).then(function(data) {
      yelpData = data;
    })
})

  L.marker([37.9375, -107.8123], { id: "Telluride" })
    .addTo(mymap)
    .bindPopup("<b>Telluride</b>")
    .on("click", function(event) {
    showWeather()
    var id = event.target.options.id;
    getData(id).then(function(data) {
      updateWeatherDom(data)
    })
    console.log(id, 'tellurideID')
    getYelpData(id).then(function(data) {
      yelpData = data;
    })
})

  L.marker([40.4850, -106.8317], { id: "Steamboat Springs" })
    .addTo(mymap)
    .bindPopup("<b>Steamboat Springs</b>")
    .on("click", function(event) {
    showWeather()
    var id = event.target.options.id;
    getData(id).then(function(data) {
      updateWeatherDom(data)
    })
    console.log(id, 'steamboatID')
    getYelpData(id).then(function(data) {
      yelpData = data;
    })
})

  L.marker([39.8868, -105.7625], { id: "Fraser" })
    .addTo(mymap)
    .bindPopup("<b>Winter Park, Fraser</b>")
    .on("click", function(event) {
    showWeather()
    var id = event.target.options.id;
    console.log(id, 'winterParkId')
    getData(id).then(function(data) {
      updateWeatherDom(data)
    })
    console.log(id, 'winterparkID')
    getYelpData(id).then(function(data) {
      yelpData = data;
    })
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

function showWeather() {
    $( ".select" ).addClass( "hidden" )
    $( ".weather-aside" ).removeClass( "hidden" )
}

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

