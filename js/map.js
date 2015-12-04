var map,
    userloc = {"lat": 38.56, "lon": -121.5, "acc": 0},
    locoptions = {timeout: 5},
    growers,
    geojsonFeature;

function initMap() {
    "use strict";
    map = L.map('map').setView([userloc.lat, userloc.lon], 15);
    
    L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/{type}/{z}/{x}/{y}.{ext}', {
	type: 'sat',
	ext: 'jpg',
	attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency',
	subdomains: '1234'
}).addTo(map);
    
    //L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    //    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    //}).addTo(map);

    var LeafIcon = L.Icon.extend({
        options: {
            shadowUrl: 'http://cdn.leafletjs.com/leaflet/v0.7.7/images/marker-shadow.png',
            iconSize:     [38, 95],
            shadowSize:   [50, 64],
            iconAnchor:   [22, 94],
            shadowAnchor: [4, 62],
            popupAnchor:  [-3, -76]
        }
    });

    var greenHouse = new LeafIcon({iconUrl: 'images/favicon-noback.png'});
    
    L.marker([38.56, -121.5,{icon: greenHouse}]).addTo(map)
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
    "use strict";
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