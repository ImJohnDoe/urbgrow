var map,
    userloc = {"lat": 38.56, "lon": -121.5, "acc": 0},
    locoptions = {timeout: 5},
    growers,
    geojsonFeature;

function initMap() {
    "use strict";
    map = L.map('map').setView([userloc.lat, userloc.lon], 13);
    
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([38.56, -121.5]).addTo(map)
        .bindPopup('Your Urban Farm,<br> Grow!')
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

function onEachFeature(feature, layer) {
    "use strict";
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.description) {
        layer.bindPopup(feature.properties.description);
    }
}

function styleFeature(feature) {
    switch (feature.properties.Availability) {
        case 'barter': return {fillColor: "#ff0000"};
        case 'free':   return {fillColor: "#0000ff"};
    }
}

$(document).ready(function () {
    "use strict";
    // Get the location from the web browser if user approves
    //navigator.geolocation.getCurrentPosition(GetLocation, NoLocation, locoptions);
    
    // Initialize the map
    //map = L.map('map').setView([38.5725, -121.4680], 13);
    initMap();
    //growers = L.geoJson().addTo(map);
    $.getJSON('growers.json', function (json) {
        var geojsonFeature;
        geojsonFeature = json;
        //growers.addData(geojsonFeature);
        growers = L.geoJson(geojsonFeature, {
            onEachFeature: onEachFeature,
            style: styleFeature
        }).addTo(map);
    });
    loadcrops();

});