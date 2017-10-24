/**
 * @override Initialize Google Map.
 */
function initMap(){
	var points = [];//populate
	var centerPoint = points[0];
    var zoomLevel = 8;

    var bound = calculateBound(points);

    if (bound !== null && bound.getCenter() !== null) {
        centerPoint = {"lat": bound.getCenter().lat(), "lng": bound.getCenter().lng()};

        if (points.length > 1) {
            zoomLevel = calculateZoomLevel(bound);
        } else {
            zoomLevel = 12;
        }

    } else {
        if (points.length === 1) {
            zoomLevel = 12;
        }
    }

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: zoomLevel,
        center: centerPoint
    });
	
	//create markers
}


/**
 * Calculate bound on set of coordinates.
 * @param locations
 * @returns {*}
 */
function calculateBound(locations) {

    if (locations.length > 1) {
        var bound = new google.maps.LatLngBounds();
        for (var i = 0; i < locations.length; i++) {
            bound.extend(new google.maps.LatLng(locations[i]["lat"], locations[i]["lng"]));
        }
        if (bound !== null) {
            return bound;
        } else {
            return null;
        }
    } else {
        return null;
    }

}

/**
 * Calculate zoom level based on projection.
 * @param bound
 * @returns {number}
 */
function calculateZoomLevel(bound) {
    var GLOBE_WIDTH = 256; // a constant in Google's map projection
    var west = bound.getSouthWest().lng();
    var east = bound.getNorthEast().lng();
    var angle = bound.getNorthEast().lat() - bound.getSouthWest().lat();
    if (angle < 0) {
        angle += 360;
    }
    var zoom = Math.round(Math.log(150 * 360 / angle / GLOBE_WIDTH) / Math.LN2);
    return zoom;
}