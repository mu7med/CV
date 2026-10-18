(function () {
    function renderMap() {
        var mapElement = document.getElementById('mh-map');
        if (!mapElement || typeof google === 'undefined' || !google.maps) return;
        var riyadhCoords = new google.maps.LatLng(24.8136, 46.7253);
        var mapOptions = {
            zoom: 13,
            scrollwheel: false,
            navigationControl: false,
            center: riyadhCoords,
            styles: [
                { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] },
                { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] },
                { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] },
                { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] },
                { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] },
                { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] },
                { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] },
                { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] },
                { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] },
                { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] },
                { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] },
                { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] },
                { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] },
                { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }
            ]
        };
        var map = new google.maps.Map(mapElement, mapOptions);
        new google.maps.Marker({
            position: riyadhCoords,
            map: map,
            title: 'Qurtubah, Riyadh, KSA'
        });
    }

    window.initPortfolioMap = renderMap;

    document.addEventListener('DOMContentLoaded', function () {
        var mapElement = document.getElementById('mh-map');
        if (!mapElement) return;

        if (typeof google !== 'undefined' && google.maps) {
            renderMap();
            return;
        }

        var apiKey = (window.__ENV__ && window.__ENV__.GOOGLE_MAPS_API_KEY) ||
            mapElement.getAttribute('data-maps-api-key');
        if (!apiKey) return;

        var script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?key=' + encodeURIComponent(apiKey) + '&callback=initPortfolioMap';
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
    });
})();
