var map,
    userloc = {"lat": 38.5725, "lon": -121.4680, "acc": 0},
    locoptions = {timeout: 5},
    growers;

function initMap() {
    "use strict";
    map = L.map('map').setView([userloc.lat, userloc.lon], 13);
    
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([38.5725, -121.4680]).addTo(map)
        .bindPopup('An Urban Farm<br> Grow!')
        .openPopup();
}

function GetLocation(location) {
    "use strict";
    // Get the location from the web browser if user approves
    userloc = {"lat": location.coords.latitude, "lon": location.coords.longitude, "acc": location.coords.accuracy};
    // alert(loc);
}

function NoLocation(error) {
    "use strict";
    userloc = {"lat": 38.5725, "lon": -121.4680, "acc": 0};
    initMap();
    switch (error.code) {
    case error.PERMISSION_DENIED:
        userloc = {"lat": 38.5725, "lon": -121.4680, "acc": 0};
        initMap();
        break;
    case error.POSITION_UNAVAILABLE:
        userloc = {"lat": 38.5725, "lon": -121.4680, "acc": 0};
        initMap();
        break;
    case error.TIMEOUT:
        userloc = {"lat": 38.5725, "lon": -121.4680, "acc": 0};
        initMap();
        break;
    case error.UNKNOWN_ERROR:
        userloc = {"lat": 38.5725, "lon": -121.4680, "acc": 0};
        initMap();
        break;
    }
}

$(document).ready(function () {
    "use strict";
    // Get the location from the web browser if user approves
    //navigator.geolocation.getCurrentPosition(GetLocation, NoLocation, locoptions);
    
    // Initialize the map
    //map = L.map('map').setView([38.5725, -121.4680], 13);
    initMap();
    growers = L.geoJson().addTo(map);
    $.getJSON('growers.json', function (json) {
        var geojsonFeature;
        geojsonFeature = json;
        growers.addData(geojsonFeature);
    });
    loadcrops();

});