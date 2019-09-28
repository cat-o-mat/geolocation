// Find the needed html elements
const geocoordInfoField = document.getElementById("info");
let map = document.getElementById("map");
// Cet default coords (used before user data is available)
let lat = 37.233333;
let lon = -115.808333;
let trackingId;
// setting default zoom value
let zoom = 10;

function getLocation() {
    // Check if geolocation is supported by the browser
    if (navigator.geolocation) {
        // If the locating of the device was successful, the function returns a position-object with the coordinates
        // to the first parameter. Here the information can be processed as needed.
        // If the locating of the device was unsuccessful, a fallback error handling function is may be called.
        zoom = 10;
        navigator.geolocation.getCurrentPosition(showPosition, showError, {enableHighAccuracy: false});
    } else {
        geocoordInfoField.innerHTML = "Geolocation is not supported by this browser.";
    }
}

// Tracks location as device moves
function trackLocation() {
    // Check if geolocation is supported by the browser
    if (navigator.geolocation) {
        // returns the tracking id used to stop the tracking
        zoom = 17;
        trackingId = navigator.geolocation.watchPosition(showPosition, showError);
    } else {
        geocoordInfoField.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function stopTracking() {
    // Check if geolocation is supported by the browser
    if (navigator.geolocation) {
        // stops the tracking with the ID trackingId
        navigator.geolocation.clearWatch(trackingId);
    } else {
        geocoordInfoField.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function getLocationWithHighAccuracy() {
    if (navigator.geolocation) {
        zoom = 10;
        navigator.geolocation.getCurrentPosition(showPosition, showError, {enableHighAccuracy: true});
    } else {
        geocoordInfoField.innerHTML = "Geolocation is not supported by this browser.";
    }
}

// A function that prints out the longitude and latitude and shows the location on a map
function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    geocoordInfoField.innerHTML = "Latitude: " + lat +
        "<br>Longitude: " + lon +
        "<br>Accuracy: " + position.coords.accuracy +
        "<br>Altitude: " + position.coords.altitude +
        "<br>Altitude accuracy: " + position.coords.altitudeAccuracy +
        "<br>Heading: " + position.coords.heading +
        "<br>Speed: " + position.coords.speed +
        "<br>Timestamp: " + position.timestamp;

    document.getElementById("map").innerText = "";

    // Here I chose OpenLayers because it's free
    map = new ol.Map({
        // attaches the map to a html object
        target: 'map',
        // ads the map layer, that shows the map
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        // defining the center and zoom of the map
        view: new ol.View({
            center: ol.proj.fromLonLat([lon, lat]),
            zoom: zoom
        })
    });

    // create and add the marker layer to the map
    map.addLayer(createMarker());

}

// error handling fallback
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            geocoordInfoField.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            geocoordInfoField.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            geocoordInfoField.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            geocoordInfoField.innerHTML = "An unknown error occurred."
            break;
    }
}

// Creates a layer for the device location marker
function createMarker() {
    // define a new feature
    var marker = new ol.Feature({
        geometry: new ol.geom.Point(
            ol.proj.fromLonLat([lon, lat])
        ),
    });

    // make a source for the marker to be able the add it to the map
    // you can add multiple markers by just extanding the array
    var vectorSource = new ol.source.Vector({
        features: [marker]
    });

    // create the marker layer
    return markerVectorLayer = new ol.layer.Vector({
        source: vectorSource,
    });
}

// shows the map after the page loads
// uses default coordinates
map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([lon, lat]),
        zoom: 6
    })
});

