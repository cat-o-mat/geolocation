var map = document.getElementById("map");
var x = document.getElementById("geolocation");
var lat = 0.0;
var long = 0.0;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }

}
function showPosition(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;

    x.innerHTML = "Latitude: " + lat +
        "<br>Longitude: " + long;

    map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([long, lat]),
            zoom: 10
        })
    });

    var marker = new ol.Feature({
        geometry: new ol.geom.Point(
            ol.proj.fromLonLat([long,lat])
        ),
    });

    var vectorSource = new ol.source.Vector({
        features: [marker]
    });

    var markerVectorLayer = new ol.layer.Vector({
        source: vectorSource,
    });
    map.addLayer(markerVectorLayer);
}
function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }

}

